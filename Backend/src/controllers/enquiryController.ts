import { Request, Response, NextFunction } from "express";
import Enquiry from "../models/enquiryModel";

// Sanitize plain-text input
const sanitizeInput = (value: string): string => {
  return value.replace(/<[^>]*>/g, "").trim();
};

// Create enquiry
export const createEnquiry = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, email, phone, userType, interest, message } = req.body;

    const enquiry = await Enquiry.create({
      name: sanitizeInput(name),
      email: sanitizeInput(email),
      phone: sanitizeInput(phone),
      userType: sanitizeInput(userType),
      interest: sanitizeInput(interest),
      message: sanitizeInput(message),
    });

    res.status(201).json({
      message: "Enquiry submitted successfully",
      enquiry,
    });
  } catch (error) {
    next(error);
  }
};

// Get one enquiry by ID
export const getEnquiryById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const enquiry = await Enquiry.findById(id);

    if (!enquiry) {
      return res.status(404).json({
        message: "Enquiry not found.",
      });
    }

    res.status(200).json({
      enquiry,
    });
  } catch (error) {
    res.status(400).json({
      message: "Invalid enquiry ID.",
    });
  }
};

// Get all enquiries with optional status filter
export const getEnquiries = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const status = req.query.status as string | undefined;

    const filter: any = status ? { status } : {};

    const enquiries = await Enquiry.find(filter).sort({
      createdAt: -1,
    });

    res.status(200).json({
      enquiries,
    });
  } catch (error) {
    next(error);
  }
};

// Update enquiry
export const updateEnquiry = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    // Only allow status to be updated
    const { status } = req.body;

    const enquiry = await Enquiry.findByIdAndUpdate(
      id,
      { status },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!enquiry) {
      return res.status(404).json({
        message: "Enquiry not found.",
      });
    }

    res.status(200).json({
      message: "Enquiry updated successfully",
      enquiry,
    });
  } catch (error) {
    next(error);
  }
};

// Delete enquiry
export const deleteEnquiry = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const enquiry = await Enquiry.findByIdAndDelete(id);

    if (!enquiry) {
      return res.status(404).json({
        message: "Enquiry not found.",
      });
    }

    res.status(200).json({
      message: "Enquiry deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
