const {
    Student,
    Grade,
    Attendance,
    Schedule,
    Subject,
    Teacher,
    Class
} = require("../models");


// ======================================
// STUDENT REPORT
// ======================================
exports.getStudentReport = async (req, res) => {

    try {

        const student = await Student.findByPk(
            req.params.id,
            {
                include: [
                    {
                        model: Class,
                        attributes: [
                            "id",
                            "class_name"
                        ]
                    },

                    {
                        model: Grade,
                        include: [
                            {
                                model: Schedule,
                                include: [
                                    {
                                        model: Subject,
                                        attributes: [
                                            "subject_name"
                                        ]
                                    },

                                    {
                                        model: Teacher,
                                        attributes: [
                                            "teacher_name"
                                        ]
                                    }
                                ]
                            }
                        ]
                    },

                    {
                        model: Attendance
                    }
                ]
            }
        );


        if (!student) {

            return res.status(404).json({

                success:false,

                message:"Siswa tidak ditemukan"

            });

        }



        const attendance = {

            hadir: 0,

            izin: 0,

            sakit: 0,

            alpa: 0

        };



        student.Attendances.forEach(item => {


            if(item.status === "Hadir")
                attendance.hadir++;


            if(item.status === "Izin")
                attendance.izin++;


            if(item.status === "Sakit")
                attendance.sakit++;


            if(item.status === "Alpa")
                attendance.alpa++;


        });



        res.json({

            success:true,

            data: {

                student: student.fullname,

                class:
                    student.Class
                    ?
                    student.Class.class_name
                    :
                    null,


                grades:
                    student.Grades,


                attendance

            }

        });



    } catch(err) {


        res.status(500).json({

            success:false,

            message:err.message

        });


    }

};