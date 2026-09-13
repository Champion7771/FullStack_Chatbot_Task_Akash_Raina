"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const Admin_1 = __importDefault(require("./models/Admin"));
dotenv_1.default.config();
const createAdmin = async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGO_URI);
        const email = "admin@dronetv.com";
        const password = "admin123";
        const existingAdmin = await Admin_1.default.findOne({ email });
        if (existingAdmin) {
            console.log("Admin already exists.");
            return;
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        await Admin_1.default.create({
            email,
            password: hashedPassword,
            role: "admin",
        });
        console.log("Admin created successfully.");
    }
    catch (error) {
        console.error("Failed to create admin:", error);
    }
    finally {
        await mongoose_1.default.disconnect();
    }
};
createAdmin();
