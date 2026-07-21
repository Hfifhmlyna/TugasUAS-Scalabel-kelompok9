const { Student, Class } = require("../models");
const saveActivity = require("../utils/activityLogger");

// ======================================
// GET ALL STUDENTS
// ======================================
exports.getAllStudents = async (req, res) => {
    try {

        const students = await Student.findAll({
            include: [
                {
                    model: Class,
                    attributes: ["id", "class_name", "school_year"]
                }
            ]
        });

        res.status(200).json({
            success: true,
            total: students.length,
            data: students
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// ======================================
// GET STUDENT BY ID
// ======================================
exports.getStudentById = async (req, res) => {
    try {

        const student = await Student.findByPk(req.params.id, {
            include: [
                {
                    model: Class,
                    attributes: ["id", "class_name", "school_year"]
                }
            ]
        });

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Siswa tidak ditemukan"
            });
        }

        res.status(200).json({
            success: true,
            data: student
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// ======================================
// CREATE STUDENT
// ======================================
exports.createStudent = async (req, res) => {
    try {

        const {
            class_id,
            nis,
            nisn,
            fullname,
            gender,
            birth_place,
            birth_date,
            religion,
            phone,
            address,
            photo,
            status
        } = req.body;

        const student = await Student.create({
            class_id,
            nis,
            nisn,
            fullname,
            gender,
            birth_place,
            birth_date,
            religion,
            phone,
            address,
            photo,
            status
        });

        // Activity Log
        await saveActivity(
            req.user.id,
            `Menambahkan siswa ${student.fullname}`,
            req.ip
        );

        res.status(201).json({
            success: true,
            message: "Siswa berhasil ditambahkan",
            data: student
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// ======================================
// UPDATE STUDENT
// ======================================
exports.updateStudent = async (req, res) => {
    try {

        const student = await Student.findByPk(req.params.id);

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Siswa tidak ditemukan"
            });
        }

        const {
            class_id,
            nis,
            nisn,
            fullname,
            gender,
            birth_place,
            birth_date,
            religion,
            phone,
            address,
            photo,
            status
        } = req.body;

        await student.update({
            class_id,
            nis,
            nisn,
            fullname,
            gender,
            birth_place,
            birth_date,
            religion,
            phone,
            address,
            photo,
            status
        });

        // Activity Log
        await saveActivity(
            req.user.id,
            `Mengubah data siswa ${student.fullname}`,
            req.ip
        );

        res.status(200).json({
            success: true,
            message: "Siswa berhasil diupdate",
            data: student
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// ======================================
// DELETE STUDENT
// ======================================
exports.deleteStudent = async (req, res) => {
    try {

        const student = await Student.findByPk(req.params.id);

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Siswa tidak ditemukan"
            });
        }

        const studentName = student.fullname;

        await student.destroy();

        // Activity Log
        await saveActivity(
            req.user.id,
            `Menghapus siswa ${studentName}`,
            req.ip
        );

        res.status(200).json({
            success: true,
            message: "Siswa berhasil dihapus"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};