const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");
const saveActivity = require("../utils/activityLogger");
const { User, Role } = require("../models");

exports.login = async (req, res) => {
    try {

        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: "Username dan password wajib diisi"
            });
        }

        const user = await User.findOne({
            where: {
                username
            },
            include: [
                {
                    model: Role,
                    attributes: ["id", "role_name"]
                }
            ]
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User tidak ditemukan"
            });
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).json({
                success: false,
                message: "Password salah"
            });
        }

        // ============================
        // SIMPAN ACTIVITY LOG
        // ============================
        await saveActivity(
            user.id,
            "Login ke sistem",
            req.ip
        );

        const token = generateToken(user);

        res.status(200).json({
            success: true,
            message: "Login berhasil",
            token,
            user: {
                id: user.id,
                fullname: user.fullname,
                username: user.username,
                email: user.email,
                role: user.Role.role_name
            }
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};