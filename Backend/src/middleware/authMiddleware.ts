import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const adminAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.adminToken;

    if (!token) {
      return res.status(401).json({
        message: "Authentication required.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
      email: string;
      role: string;
    };

    if (decoded.role !== "admin") {
      return res.status(403).json({
        message: "Admin access required.",
      });
    }

    req.user = decoded;

    next();
  } catch (error) {
    console.error("AUTH ERROR:", error);

    return res.status(401).json({
      message: "Invalid or expired token.",
    });
  }
};
