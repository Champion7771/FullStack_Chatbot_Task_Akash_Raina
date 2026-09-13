import { Router } from "express";
import {
  createEnquiry,
  getEnquiries,
  getEnquiryById,
  updateEnquiry,
  deleteEnquiry,
} from "../controllers/enquiryController";
import validateEnquiry from "../middleware/validationMiddleware";
import { adminAuth } from "../middleware/authMiddleware";

const router = Router();

router.post("/", validateEnquiry, createEnquiry);

router.get("/:id", adminAuth, getEnquiryById);

router.get("/", adminAuth, getEnquiries);

router.patch("/:id", adminAuth, updateEnquiry);

router.delete("/:id", adminAuth, deleteEnquiry);

export default router;
