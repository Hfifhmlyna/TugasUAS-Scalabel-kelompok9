const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
require("dotenv").config();


// ======================================
// DATABASE
// ======================================
const db = require("./models");


// ======================================
// IMPORT ROUTES
// ======================================
const authRoutes = require("./routes/authRoutes");

const userRoutes = require("./routes/userRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const majorRoutes = require("./routes/majorRoutes");
const classRoutes = require("./routes/classRoutes");
const studentRoutes = require("./routes/studentRoutes");
const guardianRoutes = require("./routes/guardianRoutes");
const academicYearRoutes = require("./routes/academicYearRoutes");

const activityLogRoutes = require("./routes/activityLogRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");


// =============================
// AKADEMIK ROUTES
// =============================
const subjectRoutes = require("./routes/subjectRoutes");

const scheduleRoutes = require("./routes/scheduleRoutes");

const gradeRoutes = require("./routes/gradeRoutes");

const attendanceRoutes = require("./routes/attendanceRoutes");


// =============================
// REPORT ROUTES
// =============================
const reportRoutes = require("./routes/reportRoutes");



// ======================================
// INIT APP
// ======================================
const app = express();



// ======================================
// MIDDLEWARE
// ======================================
app.use(express.json());

app.use(
    express.urlencoded({
        extended: true
    })
);

app.use(cors());

app.use(helmet());

app.use(compression());

app.use(cookieParser());

app.use(morgan("dev"));



// ======================================
// HOME
// ======================================
app.get("/", (req, res) => {

    res.json({

        success:true,

        message:"SIDAKES API Running",

        version:"1.0.0"

    });

});



// ======================================
// DATABASE TEST
// ======================================
app.get("/test", async (req,res)=>{

    try{

        await db.sequelize.authenticate();

        res.json({

            success:true,

            message:"Database Connected"

        });


    }catch(err){

        res.status(500).json({

            success:false,

            message:err.message

        });

    }

});



// ======================================
// API ROUTES
// ======================================


// AUTH
app.use(
    "/api/auth",
    authRoutes
);


// DASHBOARD
app.use(
    "/api/dashboard",
    dashboardRoutes
);



// ======================================
// MASTER DATA
// ======================================

app.use(
    "/api/users",
    userRoutes
);


app.use(
    "/api/teachers",
    teacherRoutes
);


app.use(
    "/api/majors",
    majorRoutes
);


app.use(
    "/api/classes",
    classRoutes
);


app.use(
    "/api/students",
    studentRoutes
);


app.use(
    "/api/guardians",
    guardianRoutes
);


app.use(
    "/api/academic-years",
    academicYearRoutes
);



// ======================================
// AKADEMIK
// ======================================


app.use(
    "/api/subjects",
    subjectRoutes
);


app.use(
    "/api/schedules",
    scheduleRoutes
);


app.use(
    "/api/grades",
    gradeRoutes
);


app.use(
    "/api/attendance",
    attendanceRoutes
);



// ======================================
// REPORT
// ======================================

app.use(
    "/api/reports",
    reportRoutes
);



// ======================================
// ACTIVITY LOG
// ======================================

app.use(
    "/api/activity-logs",
    activityLogRoutes
);



// ======================================
// 404
// ======================================

app.use((req,res)=>{

    res.status(404).json({

        success:false,

        message:"Route tidak ditemukan"

    });

});



// ======================================
// ERROR HANDLER
// ======================================

app.use((err,req,res,next)=>{

    console.error(err);


    res.status(500).json({

        success:false,

        message:err.message

    });


});



// ======================================
// START SERVER
// ======================================

const PORT = process.env.PORT || 5000;



async function startServer(){


    try{


        console.log("========================================");
        console.log("SIDAKES BACKEND");
        console.log("========================================");


        console.log("Host :",process.env.DB_HOST);
        console.log("Port :",process.env.DB_PORT);
        console.log("DB   :",process.env.DB_NAME);
        console.log("User :",process.env.DB_USER);


        console.log("========================================");



        await db.sequelize.authenticate();


        console.log("Database Connected");



        await db.sequelize.sync({

            alter:false

        });


        console.log("All Models Synchronized");



        app.listen(PORT,()=>{


            console.log("========================================");

            console.log(
                `Server Running : http://localhost:${PORT}`
            );


            console.log("========================================");


        });



    }catch(err){


        console.error(
            "Database Connection Failed"
        );


        console.error(err);


        process.exit(1);


    }


}



startServer();