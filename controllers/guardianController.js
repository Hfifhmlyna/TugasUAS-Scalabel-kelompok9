const { Guardian, Student } = require("../models");
const saveActivity = require("../utils/activityLogger");

// ======================================
// GET ALL GUARDIANS
// ======================================
exports.getAllGuardians = async (req, res) => {
    try {

        const guardians = await Guardian.findAll({
            include: [
                {
                    model: Student,
                    attributes: [
                        "id",
                        "nis",
                        "nisn",
                        "fullname"
                    ]
                }
            ]
        });

        res.status(200).json({
            success: true,
            total: guardians.length,
            data: guardians
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// ======================================
// GET GUARDIAN BY ID
// ======================================
exports.getGuardianById = async (req, res) => {
    try {

        const guardian = await Guardian.findByPk(req.params.id, {
            include: [
                {
                    model: Student,
                    attributes: [
                        "id",
                        "nis",
                        "nisn",
                        "fullname"
                    ]
                }
            ]
        });

        if (!guardian) {
            return res.status(404).json({
                success: false,
                message: "Data wali tidak ditemukan"
            });
        }

        res.status(200).json({
            success: true,
            data: guardian
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// ======================================
// CREATE GUARDIAN
// ======================================
exports.createGuardian = async (req, res) => {
    try {

        const {
            student_id,
            father_name,
            mother_name,
            guardian_phone,
            guardian_address
        } = req.body;

        const guardian = await Guardian.create({
            student_id,
            father_name,
            mother_name,
            guardian_phone,
            guardian_address
        });

        // Activity Log
        await saveActivity(
            req.user.id,
            `Menambahkan data wali siswa ID ${guardian.student_id}`,
            req.ip
        );

        res.status(201).json({
            success: true,
            message: "Data wali berhasil ditambahkan",
            data: guardian
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// ======================================
// UPDATE GUARDIAN
// ======================================
exports.updateGuardian = async (req, res) => {
    try {

        const guardian = await Guardian.findByPk(req.params.id);

        if (!guardian) {
            return res.status(404).json({
                success: false,
                message: "Data wali tidak ditemukan"
            });
        }

        const {
            student_id,
            father_name,
            mother_name,
            guardian_phone,
            guardian_address
        } = req.body;

        await guardian.update({
            student_id,
            father_name,
            mother_name,
            guardian_phone,
            guardian_address
        });

        // Activity Log
        await saveActivity(
            req.user.id,
            `Mengubah data wali siswa ID ${guardian.student_id}`,
            req.ip
        );

        res.status(200).json({
            success: true,
            message: "Data wali berhasil diupdate",
            data: guardian
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// ======================================
// DELETE GUARDIAN
// ======================================
exports.deleteGuardian = async (req, res) => {
    try {

        const guardian = await Guardian.findByPk(req.params.id);

        if (!guardian) {
            return res.status(404).json({
                success: false,
                message: "Data wali tidak ditemukan"
            });
        }

        const studentId = guardian.student_id;

        await guardian.destroy();

        // Activity Log
        await saveActivity(
            req.user.id,
            `Menghapus data wali siswa ID ${studentId}`,
            req.ip
        );

        res.status(200).json({
            success: true,
            message: "Data wali berhasil dihapus"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};