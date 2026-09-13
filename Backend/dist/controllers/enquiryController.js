"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEnquiry = exports.updateEnquiry = exports.getEnquiries = exports.getEnquiryById = exports.createEnquiry = void 0;
const enquiryModel_1 = __importDefault(require("../models/enquiryModel"));
// Sanitize plain-text input
const sanitizeInput = (value) => {
    return value.replace(/<[^>]*>/g, "").trim();
};
// Create enquiry
const createEnquiry = async (req, res, next) => {
    try {
        const { name, email, phone, userType, interest, message } = req.body;
        const enquiry = await enquiryModel_1.default.create({
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
    }
    catch (error) {
        next(error);
    }
};
exports.createEnquiry = createEnquiry;
// Get one enquiry by ID
const getEnquiryById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const enquiry = await enquiryModel_1.default.findById(id);
        if (!enquiry) {
            return res.status(404).json({
                message: "Enquiry not found.",
            });
        }
        res.status(200).json({
            enquiry,
        });
    }
    catch (error) {
        res.status(400).json({
            message: "Invalid enquiry ID.",
        });
    }
};
exports.getEnquiryById = getEnquiryById;
// Get all enquiries with optional status filter
const getEnquiries = async (req, res, next) => {
    try {
        const status = req.query.status;
        const filter = status ? { status } : {};
        const enquiries = await enquiryModel_1.default.find(filter).sort({
            createdAt: -1,
        });
        res.status(200).json({
            enquiries,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getEnquiries = getEnquiries;
// Update enquiry
const updateEnquiry = async (req, res, next) => {
    try {
        const { id } = req.params;
        // Only allow status to be updated
        const { status } = req.body;
        const enquiry = await enquiryModel_1.default.findByIdAndUpdate(id, { status }, {
            new: true,
            runValidators: true,
        });
        if (!enquiry) {
            return res.status(404).json({
                message: "Enquiry not found.",
            });
        }
        res.status(200).json({
            message: "Enquiry updated successfully",
            enquiry,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updateEnquiry = updateEnquiry;
// Delete enquiry
const deleteEnquiry = async (req, res, next) => {
    try {
        const { id } = req.params;
        const enquiry = await enquiryModel_1.default.findByIdAndDelete(id);
        if (!enquiry) {
            return res.status(404).json({
                message: "Enquiry not found.",
            });
        }
        res.status(200).json({
            message: "Enquiry deleted successfully",
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteEnquiry = deleteEnquiry;
