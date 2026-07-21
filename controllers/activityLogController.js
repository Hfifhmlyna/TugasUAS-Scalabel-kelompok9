const { ActivityLog, User } = require("../models");

// ======================================
// GET ALL ACTIVITY LOGS
// ======================================
exports.getAllActivityLogs = async (req, res) => {
    try {

        const logs = await ActivityLog.findAll({
            include: [
                {
                    model: User,
                    attributes: [
                        "id",
                        "fullname",
                        "username"
                    ]
                }
            ],
            order: [["id", "DESC"]]
        });

        res.status(200).json({
            success: true,
            total: logs.length,
            data: logs
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// ======================================
// GET ACTIVITY LOG BY ID
// ======================================
exports.getActivityLogById = async (req, res) => {
    try {

        const log = await ActivityLog.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: [
                        "id",
                        "fullname",
                        "username"
                    ]
                }
            ]
        });

        if (!log) {
            return res.status(404).json({
                success: false,
                message: "Activity Log tidak ditemukan"
            });
        }

        res.status(200).json({
            success: true,
            data: log
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// ======================================
// DELETE ACTIVITY LOG
// ======================================
exports.deleteActivityLog = async (req, res) => {
    try {

        const log = await ActivityLog.findByPk(req.params.id);

        if (!log) {
            return res.status(404).json({
                success: false,
                message: "Activity Log tidak ditemukan"
            });
        }

        await log.destroy();

        res.status(200).json({
            success: true,
            message: "Activity Log berhasil dihapus"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// ======================================
// DELETE ALL ACTIVITY LOGS
// ======================================
exports.deleteAllActivityLogs = async (req, res) => {
    try {

        await ActivityLog.destroy({
            where: {}
        });

        res.status(200).json({
            success: true,
            message: "Semua Activity Log berhasil dihapus"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};