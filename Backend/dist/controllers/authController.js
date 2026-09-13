"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutAdmin = exports.loginAdmin = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Admin_1 = __importDefault(require("../models/Admin"));
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required.",
            });
        }
        // Find admin by email
        const admin = await Admin_1.default.findOne({ email });
        if (!admin) {
            return res.status(401).json({
                message: "Invalid email or password.",
            });
        }
        // Check password
        const passwordCorrect = await bcryptjs_1.default.compare(password, admin.password);
        if (!passwordCorrect) {
            return res.status(401).json({
                message: "Invalid email or password.",
            });
        }
        // Create JWT
        const token = jsonwebtoken_1.default.sign({
            id: admin._id,
            role: admin.role,
        }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });
        // Store token in HttpOnly cookie
        res.cookie("adminToken", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000,
        });
        return res.status(200).json({
            message: "Admin login successful.",
        });
    }
    catch (error) {
        console.error("Admin login failed:", error);
        return res.status(500).json({
            message: "Server error.",
        });
    }
};
exports.loginAdmin = loginAdmin;
const logoutAdmin = (_req, res) => {
    res.clearCookie("adminToken");
    return res.status(200).json({
        message: "Logout successful.",
    });
};
exports.logoutAdmin = logoutAdmin;
