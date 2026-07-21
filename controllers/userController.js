const { User, Role } = require("../models");
const bcrypt = require("bcrypt");
const saveActivity = require("../utils/activityLogger");

// ======================================
// GET ALL USERS
// ======================================
exports.getAllUsers = async (req, res) => {
    try {

        const users = await User.findAll({
            include: [
                {
                    model: Role,
                    attributes: ["role_name"]
                }
            ],
            attributes: {
                exclude: ["password"]
            }
        });

        res.status(200).json({
            success: true,
            total: users.length,
            data: users
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

// ======================================
// GET USER BY ID
// ======================================
exports.getUserById = async (req, res) => {

    try {

        const user = await User.findByPk(req.params.id, {
            include: [
                {
                    model: Role,
                    attributes: ["role_name"]
                }
            ],
            attributes: {
                exclude: ["password"]
            }
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User tidak ditemukan"
            });
        }

        res.status(200).json({
            success: true,
            data: user
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

// ======================================
// CREATE USER
// ======================================
exports.createUser = async (req, res) => {

    try {

        const {
            role_id,
            fullname,
            username,
            email,
            password,
            photo,
            status
        } = req.body;

        const checkUsername = await User.findOne({
            where: { username }
        });

        if (checkUsername) {
            return res.status(400).json({
                success: false,
                message: "Username sudah digunakan"
            });
        }

        const checkEmail = await User.findOne({
            where: { email }
        });

        if (checkEmail) {
            return res.status(400).json({
                success: false,
                message: "Email sudah digunakan"
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            role_id,
            fullname,
            username,
            email,
            password: hashPassword,
            photo,
            status
        });

        // Activity Log
        await saveActivity(
            req.user.id,
            `Menambahkan user ${user.fullname}`,
            req.ip
        );

        res.status(201).json({
            success: true,
            message: "User berhasil ditambahkan",
            data: user
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

// ======================================
// UPDATE USER
// ======================================
exports.updateUser = async (req, res) => {

    try {

        const user = await User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User tidak ditemukan"
            });
        }

        const {
            role_id,
            fullname,
            username,
            email,
            password,
            photo,
            status
        } = req.body;

        let hashPassword = user.password;

        if (password) {
            hashPassword = await bcrypt.hash(password, 10);
        }

        await user.update({
            role_id,
            fullname,
            username,
            email,
            password: hashPassword,
            photo,
            status
        });

        // Activity Log
        await saveActivity(
            req.user.id,
            `Mengubah data user ${user.fullname}`,
            req.ip
        );

        res.status(200).json({
            success: true,
            message: "User berhasil diupdate",
            data: user
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

// ======================================
// DELETE USER
// ======================================
exports.deleteUser = async (req, res) => {

    try {

        const user = await User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User tidak ditemukan"
            });
        }

        const fullname = user.fullname;

        await user.destroy();

        // Activity Log
        await saveActivity(
            req.user.id,
            `Menghapus user ${fullname}`,
            req.ip
        );

        res.status(200).json({
            success: true,
            message: "User berhasil dihapus"
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};