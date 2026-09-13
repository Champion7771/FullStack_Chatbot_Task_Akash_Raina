import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Admin from "./models/Admin";

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);

    const email = "admin@dronetv.com";
    const password = "admin123";

    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      console.log("Admin already exists.");
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await Admin.create({
      email,
      password: hashedPassword,
      role: "admin",
    });

    console.log("Admin created successfully.");
  } catch (error) {
    console.error("Failed to create admin:", error);
  } finally {
    await mongoose.disconnect();
  }
};

createAdmin();
