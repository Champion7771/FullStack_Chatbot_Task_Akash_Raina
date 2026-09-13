import { Request, Response, NextFunction } from "express";

const validateEnquiry = (req: Request, res: Response, next: NextFunction) => {
  const { name, email, phone, userType, interest, message } = req.body;

  const errors: string[] = [];

  // Name
  if (!name || !name.trim()) {
    errors.push("Name is required.");
  }

  // Email
  if (!email || !email.trim()) {
    errors.push("Email is required.");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push("Enter a valid email address.");
  }

  // Phone
  if (!phone || !phone.trim()) {
    errors.push("Phone number is required.");
  } else if (!/^[0-9]{10}$/.test(phone)) {
    errors.push("Enter a valid 10-digit phone number.");
  }

  // User Type
  if (!userType || !userType.trim()) {
    errors.push("User type is required.");
  }

  // Interest
  if (!interest || !interest.trim()) {
    errors.push("Service or course interest is required.");
  }

  // Message
  if (!message || !message.trim()) {
    errors.push("Message is required.");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      message: "Validation failed.",
      errors,
    });
  }

  next();
};

export default validateEnquiry;
