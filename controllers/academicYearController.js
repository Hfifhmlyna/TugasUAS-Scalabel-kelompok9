const { AcademicYear } = require("../models");
const saveActivity = require("../utils/activityLogger");

// ======================================
// GET ALL ACADEMIC YEARS
// ======================================
exports.getAllAcademicYears = async (req, res) => {
    try {

        const academicYears = await AcademicYear.findAll();

        res.status(200).json({
            success: true,
            total: academicYears.length,
            data: academicYears
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// ======================================
// GET ACADEMIC YEAR BY ID
// ======================================
exports.getAcademicYearById = async (req, res) => {
    try {

        const academicYear = await AcademicYear.findByPk(req.params.id);

        if (!academicYear) {
            return res.status(404).json({
                success: false,
                message: "Tahun ajaran tidak ditemukan"
            });
        }

        res.status(200).json({
            success: true,
            data: academicYear
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// ======================================
// CREATE ACADEMIC YEAR
// ======================================
exports.createAcademicYear = async (req, res) => {
    try {

        const {
            academic_year,
            semester,
            status
        } = req.body;

        const academicYear = await AcademicYear.create({
            academic_year,
            semester,
            status
        });

        // Activity Log
        await saveActivity(
            req.user.id,
            `Menambahkan tahun ajaran ${academicYear.academic_year} (${academicYear.semester})`,
            req.ip
        );

        res.status(201).json({
            success: true,
            message: "Tahun ajaran berhasil ditambahkan",
            data: academicYear
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// ======================================
// UPDATE ACADEMIC YEAR
// ======================================
exports.updateAcademicYear = async (req, res) => {
    try {

        const academicYear = await AcademicYear.findByPk(req.params.id);

        if (!academicYear) {
            return res.status(404).json({
                success: false,
                message: "Tahun ajaran tidak ditemukan"
            });
        }

        const {
            academic_year,
            semester,
            status
        } = req.body;

        await academicYear.update({
            academic_year,
            semester,
            status
        });

        // Activity Log
        await saveActivity(
            req.user.id,
            `Mengubah tahun ajaran ${academicYear.academic_year} (${academicYear.semester})`,
            req.ip
        );

        res.status(200).json({
            success: true,
            message: "Tahun ajaran berhasil diupdate",
            data: academicYear
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// ======================================
// DELETE ACADEMIC YEAR
// ======================================
exports.deleteAcademicYear = async (req, res) => {
    try {

        const academicYear = await AcademicYear.findByPk(req.params.id);

        if (!academicYear) {
            return res.status(404).json({
                success: false,
                message: "Tahun ajaran tidak ditemukan"
            });
        }

        const tahun = academicYear.academic_year;
        const semester = academicYear.semester;

        await academicYear.destroy();

        // Activity Log
        await saveActivity(
            req.user.id,
            `Menghapus tahun ajaran ${tahun} (${semester})`,
            req.ip
        );

        res.status(200).json({
            success: true,
            message: "Tahun ajaran berhasil dihapus"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};