const {
    Grade,
    Student,
    Schedule,
    Teacher,
    Subject,
    Class
} = require("../models");

const saveActivity = require("../utils/activityLogger");

// ======================================
// GET ALL GRADES
// ======================================
exports.getAllGrades = async (req, res) => {
    try {

        const grades = await Grade.findAll({
            include: [
                {
                    model: Student,
                    attributes: ["id", "nis", "fullname"]
                },
                {
                    model: Schedule,
                    include: [
                        {
                            model: Teacher,
                            attributes: ["id", "teacher_name"]
                        },
                        {
                            model: Subject,
                            attributes: ["id", "subject_name"]
                        },
                        {
                            model: Class,
                            attributes: ["id", "class_name"]
                        }
                    ]
                }
            ],
            order: [["id", "ASC"]]
        });

        res.json({
            success: true,
            total: grades.length,
            data: grades
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

// ======================================
// GET GRADE BY ID
// ======================================
exports.getGradeById = async (req, res) => {
    try {

        const grade = await Grade.findByPk(req.params.id, {
            include: [
                {
                    model: Student,
                    attributes: ["id", "nis", "fullname"]
                },
                {
                    model: Schedule,
                    include: [
                        {
                            model: Teacher,
                            attributes: ["id", "teacher_name"]
                        },
                        {
                            model: Subject,
                            attributes: ["id", "subject_name"]
                        },
                        {
                            model: Class,
                            attributes: ["id", "class_name"]
                        }
                    ]
                }
            ]
        });

        if (!grade) {
            return res.status(404).json({
                success: false,
                message: "Data nilai tidak ditemukan"
            });
        }

        res.json({
            success: true,
            data: grade
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

// ======================================
// CREATE GRADE
// ======================================
exports.createGrade = async (req, res) => {
    try {

        const {
            student_id,
            schedule_id,
            assignment_score,
            uts_score,
            uas_score,
            remarks
        } = req.body;

        const student = await Student.findByPk(student_id);

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Siswa tidak ditemukan"
            });
        }

        const schedule = await Schedule.findByPk(schedule_id);

        if (!schedule) {
            return res.status(404).json({
                success: false,
                message: "Jadwal tidak ditemukan"
            });
        }

        const final_score =
            (
                Number(assignment_score) +
                Number(uts_score) +
                Number(uas_score)
            ) / 3;

        const grade = await Grade.create({
            student_id,
            schedule_id,
            assignment_score,
            uts_score,
            uas_score,
            final_score,
            remarks
        });

        await saveActivity(
            req.user.id,
            `Menambahkan nilai ${student.fullname}`,
            req.ip
        );

        res.status(201).json({
            success: true,
            message: "Nilai berhasil ditambahkan",
            data: grade
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

// ======================================
// UPDATE GRADE
// ======================================
exports.updateGrade = async (req, res) => {
    try {

        const grade = await Grade.findByPk(req.params.id);

        if (!grade) {
            return res.status(404).json({
                success: false,
                message: "Data nilai tidak ditemukan"
            });
        }

        const assignment =
            req.body.assignment_score ?? grade.assignment_score;

        const uts =
            req.body.uts_score ?? grade.uts_score;

        const uas =
            req.body.uas_score ?? grade.uas_score;

        const final_score =
            (
                Number(assignment) +
                Number(uts) +
                Number(uas)
            ) / 3;

        await grade.update({
            ...req.body,
            final_score
        });

        await saveActivity(
            req.user.id,
            `Mengubah nilai ID ${grade.id}`,
            req.ip
        );

        res.json({
            success: true,
            message: "Nilai berhasil diperbarui",
            data: grade
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

// ======================================
// DELETE GRADE
// ======================================
exports.deleteGrade = async (req, res) => {
    try {

        const grade = await Grade.findByPk(req.params.id);

        if (!grade) {
            return res.status(404).json({
                success: false,
                message: "Data nilai tidak ditemukan"
            });
        }

        await grade.destroy();

        await saveActivity(
            req.user.id,
            `Menghapus nilai ID ${grade.id}`,
            req.ip
        );

        res.json({
            success: true,
            message: "Nilai berhasil dihapus"
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};