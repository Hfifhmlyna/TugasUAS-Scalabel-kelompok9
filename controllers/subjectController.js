const { Subject } = require("../models");
const saveActivity = require("../utils/activityLogger");

// =========================
// GET ALL SUBJECTS
// =========================
exports.getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.findAll({
      order: [["id", "DESC"]],
    });

    res.status(200).json({
      success: true,
      total: subjects.length,
      data: subjects,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// =========================
// GET SUBJECT BY ID
// =========================
exports.getSubjectById = async (req, res) => {
  try {
    const subject = await Subject.findByPk(req.params.id);

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: "Mata pelajaran tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      data: subject,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// =========================
// CREATE SUBJECT
// =========================
exports.createSubject = async (req, res) => {
  try {
    const {
      subject_code,
      subject_name,
      description,
    } = req.body;

    if (!subject_code || !subject_name) {
      return res.status(400).json({
        success: false,
        message: "Kode dan nama mata pelajaran wajib diisi",
      });
    }

    const check = await Subject.findOne({
      where: {
        subject_code,
      },
    });

    if (check) {
      return res.status(400).json({
        success: false,
        message: "Kode mata pelajaran sudah digunakan",
      });
    }

    const subject = await Subject.create({
      subject_code,
      subject_name,
      description,
    });

    await saveActivity(
      req.user.id,
      `Menambahkan mata pelajaran ${subject.subject_name}`,
      req.ip
    );

    res.status(201).json({
      success: true,
      message: "Mata pelajaran berhasil ditambahkan",
      data: subject,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// =========================
// UPDATE SUBJECT
// =========================
exports.updateSubject = async (req, res) => {
  try {
    const subject = await Subject.findByPk(req.params.id);

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: "Mata pelajaran tidak ditemukan",
      });
    }

    const {
      subject_code,
      subject_name,
      description,
    } = req.body;

    if (subject_code !== subject.subject_code) {
      const check = await Subject.findOne({
        where: {
          subject_code,
        },
      });

      if (check) {
        return res.status(400).json({
          success: false,
          message: "Kode mata pelajaran sudah digunakan",
        });
      }
    }

    await subject.update({
      subject_code,
      subject_name,
      description,
    });

    await saveActivity(
      req.user.id,
      `Mengubah mata pelajaran ${subject.subject_name}`,
      req.ip
    );

    res.status(200).json({
      success: true,
      message: "Mata pelajaran berhasil diperbarui",
      data: subject,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// =========================
// DELETE SUBJECT
// =========================
exports.deleteSubject = async (req, res) => {
  try {

    const subject = await Subject.findByPk(req.params.id);

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: "Mata pelajaran tidak ditemukan",
      });
    }

    await saveActivity(
      req.user.id,
      `Menghapus mata pelajaran ${subject.subject_name}`,
      req.ip
    );

    await subject.destroy();

    res.status(200).json({
      success: true,
      message: "Mata pelajaran berhasil dihapus",
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};