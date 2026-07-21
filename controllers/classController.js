const { Class, Major, Teacher } = require("../models");
const saveActivity = require("../utils/activityLogger");

// ======================================
// GET ALL CLASSES
// ======================================
exports.getAllClasses = async (req, res) => {
    try {

        const classes = await Class.findAll({
            include: [
                {
                    model: Major,
                    attributes: ["id", "major_name"]
                },
                {
                    model: Teacher,
                    attributes: ["id", "teacher_name", "nip"]
                }
            ]
        });

        res.status(200).json({
            success: true,
            total: classes.length,
            data: classes
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// ======================================
// GET CLASS BY ID
// ======================================
exports.getClassById = async (req, res) => {
    try {

        const kelas = await Class.findByPk(req.params.id, {
            include: [
                {
                    model: Major,
                    attributes: ["id", "major_name"]
                },
                {
                    model: Teacher,
                    attributes: ["id", "teacher_name", "nip"]
                }
            ]
        });

        if (!kelas) {
            return res.status(404).json({
                success: false,
                message: "Kelas tidak ditemukan"
            });
        }

        res.status(200).json({
            success: true,
            data: kelas
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// ======================================
// CREATE CLASS
// ======================================
exports.createClass = async (req, res) => {
    try {

        const {
            major_id,
            teacher_id,
            class_name,
            school_year
        } = req.body;

        const kelas = await Class.create({
            major_id,
            teacher_id,
            class_name,
            school_year
        });

        // Activity Log
        await saveActivity(
            req.user.id,
            `Menambahkan kelas ${kelas.class_name}`,
            req.ip
        );

        res.status(201).json({
            success: true,
            message: "Kelas berhasil ditambahkan",
            data: kelas
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// ======================================
// UPDATE CLASS
// ======================================
exports.updateClass = async (req, res) => {
    try {

        const kelas = await Class.findByPk(req.params.id);

        if (!kelas) {
            return res.status(404).json({
                success: false,
                message: "Kelas tidak ditemukan"
            });
        }

        const {
            major_id,
            teacher_id,
            class_name,
            school_year
        } = req.body;

        await kelas.update({
            major_id,
            teacher_id,
            class_name,
            school_year
        });

        // Activity Log
        await saveActivity(
            req.user.id,
            `Mengubah kelas ${kelas.class_name}`,
            req.ip
        );

        res.status(200).json({
            success: true,
            message: "Kelas berhasil diupdate",
            data: kelas
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// ======================================
// DELETE CLASS
// ======================================
exports.deleteClass = async (req, res) => {
    try {

        const kelas = await Class.findByPk(req.params.id);

        if (!kelas) {
            return res.status(404).json({
                success: false,
                message: "Kelas tidak ditemukan"
            });
        }

        const className = kelas.class_name;

        await kelas.destroy();

        // Activity Log
        await saveActivity(
            req.user.id,
            `Menghapus kelas ${className}`,
            req.ip
        );

        res.status(200).json({
            success: true,
            message: "Kelas berhasil dihapus"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};