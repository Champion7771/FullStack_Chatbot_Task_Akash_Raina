"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const enquiryController_1 = require("../controllers/enquiryController");
const validationMiddleware_1 = __importDefault(require("../middleware/validationMiddleware"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.post("/", validationMiddleware_1.default, enquiryController_1.createEnquiry);
router.get("/:id", authMiddleware_1.adminAuth, enquiryController_1.getEnquiryById);
router.get("/", authMiddleware_1.adminAuth, enquiryController_1.getEnquiries);
router.patch("/:id", authMiddleware_1.adminAuth, enquiryController_1.updateEnquiry);
router.delete("/:id", authMiddleware_1.adminAuth, enquiryController_1.deleteEnquiry);
exports.default = router;
