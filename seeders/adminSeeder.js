const bcrypt = require("bcrypt");
const { User } = require("../models");

async function createAdmin() {
  try {
    // Cek apakah admin sudah ada
    const admin = await User.findOne({
      where: {
        username: "admin",
      },
    });

    if (admin) {
      console.log("Admin sudah ada.");
      process.exit();
    }

    // Hash password
    const hashedPassword = await bcrypt.hash("admin123", 10);

    // Simpan ke database
    await User.create({
      role_id: 1,
      fullname: "Administrator",
      username: "admin",
      email: "admin@sidakes.com",
      password: hashedPassword,
      status: "Active",
    });

    console.log("Admin berhasil dibuat.");
    process.exit();

  } catch (error) {
    console.error(error);
    process.exit();
  }
}

createAdmin();