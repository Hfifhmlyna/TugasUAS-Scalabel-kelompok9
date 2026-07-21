const { Teacher, User } = require("../models");
const saveActivity = require("../utils/activityLogger");

// ======================================
// GET ALL TEACHERS
// ======================================
exports.getAllTeachers = async (req, res) => {
    try {

        const teachers = await Teacher.findAll({
            include: [
                {
                    model: User,
                    attributes: ["fullname", "username", "email"]
                }
            ]
        });

        res.status(200).json({
            success: true,
            total: teachers.length,
            data: teachers
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
// GET TEACHER BY ID
// ======================================
exports.getTeacherById = async (req, res) => {

    try {

        const teacher = await Teacher.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ["fullname", "username", "email"]
                }
            ]
        });

        if (!teacher) {
            return res.status(404).json({
                success: false,
                message: "Guru tidak ditemukan"
            });
        }

        res.status(200).json({
            success: true,
            data: teacher
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
// CREATE TEACHER
// ======================================
exports.createTeacher = async (req, res) => {

    try {

        const {
            user_id,
            nip,
            teacher_name,
            gender,
            phone,
            address
        } = req.body;

        const teacher = await Teacher.create({
            user_id,
            nip,
            teacher_name,
            gender,
            phone,
            address
        });

        // Activity Log
        await saveActivity(
            req.user.id,
            `Menambahkan guru ${teacher.teacher_name}`,
            req.ip
        );

        res.status(201).json({
            success: true,
            message: "Guru berhasil ditambahkan",
            data: teacher
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
// UPDATE TEACHER
// ======================================
exports.updateTeacher = async (req, res) => {

    try {

        const teacher = await Teacher.findByPk(req.params.id);

        if (!teacher) {
            return res.status(404).json({
                success: false,
                message: "Guru tidak ditemukan"
            });
        }

        await teacher.update(req.body);

        // Activity Log
        await saveActivity(
            req.user.id,
            `Mengubah data guru ${teacher.teacher_name}`,
            req.ip
        );

        res.status(200).json({
            success: true,
            message: "Guru berhasil diupdate",
            data: teacher
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
// DELETE TEACHER
// ======================================
exports.deleteTeacher = async (req, res) => {

    try {

        const teacher = await Teacher.findByPk(req.params.id);

        if (!teacher) {
            return res.status(404).json({
                success: false,
                message: "Guru tidak ditemukan"
            });
        }

        const teacherName = teacher.teacher_name;

        await teacher.destroy();

        // Activity Log
        await saveActivity(
            req.user.id,
            `Menghapus guru ${teacherName}`,
            req.ip
        );

        res.status(200).json({
            success: true,
            message: "Guru berhasil dihapus"
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};