const {
    Attendance,
    Student,
    Schedule,
    Teacher,
    Subject,
    Class
} = require("../models");

const saveActivity = require("../utils/activityLogger");


// ======================================
// GET ALL ATTENDANCE
// ======================================
exports.getAllAttendance = async (req, res) => {

    try {

        const attendance = await Attendance.findAll({

            include: [

                {
                    model: Student,
                    attributes: [
                        "id",
                        "nis",
                        "fullname"
                    ]
                },

                {
                    model: Schedule,

                    include: [

                        {
                            model: Teacher,
                            attributes: [
                                "id",
                                "teacher_name"
                            ]
                        },

                        {
                            model: Subject,
                            attributes: [
                                "id",
                                "subject_name"
                            ]
                        },

                        {
                            model: Class,
                            attributes: [
                                "id",
                                "class_name"
                            ]
                        }

                    ]

                }

            ],

            order: [
                ["id", "ASC"]
            ]

        });


        res.json({

            success: true,
            total: attendance.length,
            data: attendance

        });


    } catch (err) {


        res.status(500).json({

            success: false,
            message: err.message

        });

    }

};



// ======================================
// GET ATTENDANCE BY ID
// ======================================
exports.getAttendanceById = async (req, res) => {


    try {


        const attendance = await Attendance.findByPk(
            req.params.id,
            {

                include: [

                    {
                        model: Student,
                        attributes: [
                            "id",
                            "nis",
                            "fullname"
                        ]
                    },

                    {
                        model: Schedule,

                        include: [

                            {
                                model: Teacher,
                                attributes: [
                                    "id",
                                    "teacher_name"
                                ]
                            },

                            {
                                model: Subject,
                                attributes: [
                                    "id",
                                    "subject_name"
                                ]
                            },

                            {
                                model: Class,
                                attributes: [
                                    "id",
                                    "class_name"
                                ]
                            }

                        ]

                    }

                ]

            }
        );


        if (!attendance) {

            return res.status(404).json({

                success: false,
                message: "Data absensi tidak ditemukan"

            });

        }


        res.json({

            success: true,
            data: attendance

        });


    } catch (err) {


        res.status(500).json({

            success: false,
            message: err.message

        });

    }

};



// ======================================
// CREATE ATTENDANCE
// ======================================
exports.createAttendance = async (req, res) => {


    try {


        const {

            student_id,
            schedule_id,
            date,
            status,
            description

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



        const attendance = await Attendance.create({

            student_id,
            schedule_id,
            date,
            status,
            description

        });



        await saveActivity(

            req.user.id,

            `Menambahkan absensi ${student.fullname}`,

            req.ip

        );



        res.status(201).json({

            success: true,

            message: "Absensi berhasil ditambahkan",

            data: attendance

        });



    } catch (err) {


        res.status(500).json({

            success: false,
            message: err.message

        });

    }

};



// ======================================
// UPDATE ATTENDANCE
// ======================================
exports.updateAttendance = async (req, res) => {


    try {


        const attendance = await Attendance.findByPk(
            req.params.id
        );


        if (!attendance) {


            return res.status(404).json({

                success: false,

                message: "Data absensi tidak ditemukan"

            });

        }



        await attendance.update(req.body);



        await saveActivity(

            req.user.id,

            `Mengubah absensi ID ${attendance.id}`,

            req.ip

        );



        res.json({

            success: true,

            message: "Absensi berhasil diperbarui",

            data: attendance

        });



    } catch (err) {


        res.status(500).json({

            success: false,
            message: err.message

        });

    }

};



// ======================================
// DELETE ATTENDANCE
// ======================================
exports.deleteAttendance = async (req, res) => {


    try {


        const attendance = await Attendance.findByPk(
            req.params.id
        );


        if (!attendance) {


            return res.status(404).json({

                success: false,

                message: "Data absensi tidak ditemukan"

            });

        }



        await attendance.destroy();



        await saveActivity(

            req.user.id,

            `Menghapus absensi ID ${attendance.id}`,

            req.ip

        );



        res.json({

            success: true,

            message: "Absensi berhasil dihapus"

        });



    } catch (err) {


        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};