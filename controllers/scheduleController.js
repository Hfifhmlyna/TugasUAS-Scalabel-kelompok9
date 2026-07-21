const { Schedule, Teacher, Subject, Class } = require("../models");
const saveActivity = require("../utils/activityLogger");

// =======================================
// GET ALL
// =======================================
exports.getAllSchedules = async (req, res) => {
    try {
        const schedules = await Schedule.findAll({
            include: [
                {
                    model: Teacher,
                    attributes: ["id", "teacher_name"],
                },
                {
                    model: Subject,
                    attributes: ["id", "subject_name"],
                },
                {
                    model: Class,
                    attributes: ["id", "class_name"],
                },
            ],
            order: [["id", "ASC"]],
        });

        res.json({
            success: true,
            total: schedules.length,
            data: schedules,
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message,
        });

    }
};

// =======================================
// GET BY ID
// =======================================
exports.getScheduleById = async (req, res) => {
    try {

        const schedule = await Schedule.findByPk(req.params.id, {
            include: [
                {
                    model: Teacher,
                    attributes: ["id", "teacher_name"],
                },
                {
                    model: Subject,
                    attributes: ["id", "subject_name"],
                },
                {
                    model: Class,
                    attributes: ["id", "class_name"],
                },
            ],
        });

        if (!schedule) {
            return res.status(404).json({
                success: false,
                message: "Jadwal tidak ditemukan",
            });
        }

        res.json({
            success: true,
            data: schedule,
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message,
        });

    }
};

// =======================================
// CREATE
// =======================================
exports.createSchedule = async (req, res) => {
    try {

        const {
            class_id,
            teacher_id,
            subject_id,
            day,
            start_time,
            end_time,
        } = req.body;

        const kelas = await Class.findByPk(class_id);

        if (!kelas) {
            return res.status(404).json({
                success: false,
                message: "Kelas tidak ditemukan",
            });
        }

        const guru = await Teacher.findByPk(teacher_id);

        if (!guru) {
            return res.status(404).json({
                success: false,
                message: "Guru tidak ditemukan",
            });
        }

        const subject = await Subject.findByPk(subject_id);

        if (!subject) {
            return res.status(404).json({
                success: false,
                message: "Mata pelajaran tidak ditemukan",
            });
        }

        const schedule = await Schedule.create({
            class_id,
            teacher_id,
            subject_id,
            day,
            start_time,
            end_time,
        });

        await saveActivity(
            req.user.id,
            `Menambahkan jadwal ${subject.subject_name}`,
            req.ip
        );

        res.status(201).json({
            success: true,
            message: "Jadwal berhasil ditambahkan",
            data: schedule,
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message,
        });

    }
};

// =======================================
// UPDATE
// =======================================
exports.updateSchedule = async (req, res) => {
    try {

        const schedule = await Schedule.findByPk(req.params.id);

        if (!schedule) {
            return res.status(404).json({
                success: false,
                message: "Jadwal tidak ditemukan",
            });
        }

        await schedule.update(req.body);

        await saveActivity(
            req.user.id,
            `Mengubah jadwal ID ${schedule.id}`,
            req.ip
        );

        res.json({
            success: true,
            message: "Jadwal berhasil diperbarui",
            data: schedule,
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message,
        });

    }
};

// =======================================
// DELETE
// =======================================
exports.deleteSchedule = async (req, res) => {
    try {

        const schedule = await Schedule.findByPk(req.params.id);

        if (!schedule) {
            return res.status(404).json({
                success: false,
                message: "Jadwal tidak ditemukan",
            });
        }

        await schedule.destroy();

        await saveActivity(
            req.user.id,
            `Menghapus jadwal ID ${schedule.id}`,
            req.ip
        );

        res.json({
            success: true,
            message: "Jadwal berhasil dihapus",
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message,
        });

    }
};