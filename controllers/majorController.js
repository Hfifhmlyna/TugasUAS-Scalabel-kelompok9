const { Major } = require("../models");
const saveActivity = require("../utils/activityLogger");

// ======================================
// GET ALL MAJORS
// ======================================
exports.getAllMajors = async (req, res) => {
    try {

        const majors = await Major.findAll();

        res.status(200).json({
            success: true,
            total: majors.length,
            data: majors
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
// GET MAJOR BY ID
// ======================================
exports.getMajorById = async (req, res) => {

    try {

        const major = await Major.findByPk(req.params.id);

        if (!major) {
            return res.status(404).json({
                success: false,
                message: "Jurusan tidak ditemukan"
            });
        }

        res.status(200).json({
            success: true,
            data: major
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
// CREATE MAJOR
// ======================================
exports.createMajor = async (req, res) => {

    try {

        const { major_name } = req.body;

        const check = await Major.findOne({
            where: { major_name }
        });

        if (check) {
            return res.status(400).json({
                success: false,
                message: "Jurusan sudah ada"
            });
        }

        const major = await Major.create({
            major_name
        });

        // Activity Log
        await saveActivity(
            req.user.id,
            `Menambahkan jurusan ${major.major_name}`,
            req.ip
        );

        res.status(201).json({
            success: true,
            message: "Jurusan berhasil ditambahkan",
            data: major
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
// UPDATE MAJOR
// ======================================
exports.updateMajor = async (req, res) => {

    try {

        const major = await Major.findByPk(req.params.id);

        if (!major) {
            return res.status(404).json({
                success: false,
                message: "Jurusan tidak ditemukan"
            });
        }

        await major.update(req.body);

        // Activity Log
        await saveActivity(
            req.user.id,
            `Mengubah jurusan ${major.major_name}`,
            req.ip
        );

        res.status(200).json({
            success: true,
            message: "Jurusan berhasil diupdate",
            data: major
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
// DELETE MAJOR
// ======================================
exports.deleteMajor = async (req, res) => {

    try {

        const major = await Major.findByPk(req.params.id);

        if (!major) {
            return res.status(404).json({
                success: false,
                message: "Jurusan tidak ditemukan"
            });
        }

        const majorName = major.major_name;

        await major.destroy();

        // Activity Log
        await saveActivity(
            req.user.id,
            `Menghapus jurusan ${majorName}`,
            req.ip
        );

        res.status(200).json({
            success: true,
            message: "Jurusan berhasil dihapus"
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};