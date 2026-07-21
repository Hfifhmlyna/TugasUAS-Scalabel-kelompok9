const {
    User,
    Teacher,
    Student,
    Class,
    Subject,
    Schedule,
    Grade,
    Attendance
} = require("../models");

const { fn, col } = require("sequelize");


// ======================================
// DASHBOARD UTAMA
// ======================================
exports.getDashboard = async (req, res) => {

    try {

        const users = await User.count();

        const teachers = await Teacher.count();

        const students = await Student.count();

        const classes = await Class.count();

        const subjects = await Subject.count();


        res.json({

            success: true,

            data: {

                users,

                teachers,

                students,

                classes,

                subjects

            }

        });


    } catch (err) {


        res.status(500).json({

            success: false,

            message: err.message

        });


    }

};




// ======================================
// DASHBOARD STATISTIC
// ======================================
exports.getStatistic = async (req, res) => {


    try {


        const totalUsers =
            await User.count();



        const totalTeachers =
            await Teacher.count();



        const totalStudents =
            await Student.count();



        const totalClasses =
            await Class.count();



        const totalSubjects =
            await Subject.count();



        const totalSchedules =
            await Schedule.count();



        const totalGrades =
            await Grade.count();



        const totalAttendance =
            await Attendance.count();




        // =============================
        // RATA-RATA NILAI
        // =============================

        const averageScore =
            await Grade.findOne({

                attributes: [

                    [
                        fn(
                            "AVG",
                            col("final_score")
                        ),
                        "average"
                    ]

                ],

                raw: true

            });



        let avgScore = 0;


        if (
            averageScore &&
            averageScore.average
        ) {

            avgScore =
                Number(
                    averageScore.average
                ).toFixed(2);

        }




        // =============================
        // PERSENTASE KEHADIRAN
        // =============================

        const hadir =
            await Attendance.count({

                where: {

                    status: "Hadir"

                }

            });



        let attendancePercentage = 0;



        if (totalAttendance > 0) {


            attendancePercentage =
                (
                    hadir /
                    totalAttendance
                ) * 100;


            attendancePercentage =
                attendancePercentage.toFixed(2);

        }





        res.json({

            success: true,

            data: {


                totalUsers,

                totalTeachers,

                totalStudents,

                totalClasses,

                totalSubjects,

                totalSchedules,

                totalGrades,

                totalAttendance,


                averageScore:
                    avgScore,


                attendancePercentage

            }


        });



    } catch (err) {


        res.status(500).json({

            success: false,

            message: err.message

        });


    }

};