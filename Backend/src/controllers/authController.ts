import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin";

export const loginAdmin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required.",
      });
    }

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    const passwordCorrect = await bcrypt.compare(password, admin.password);

    if (!passwordCorrect) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    // IMPORTANT: role must be included in JWT
    const token = jwt.sign(
      {
        id: admin._id.toString(),
        email: admin.email,
        role: admin.role,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1d",
      },
    );

    res.cookie("adminToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
      path: "/",
    });

    return res.status(200).json({
      message: "Admin login successful.",
    });
  } catch (error) {
    console.error("Admin login failed:", error);

    return res.status(500).json({
      message: "Server error.",
    });
  }
};

export const logoutAdmin = (_req: Request, res: Response) => {
  res.clearCookie("adminToken", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
  });

  return res.status(200).json({
    message: "Logout successful.",
  });
};
