import mongoose, { Schema, Document } from "mongoose";
import { IEnquiry, EnquiryStatus } from "../types/enquiryTypes";

export interface EnquiryDocument extends IEnquiry, Document {}

const enquirySchema = new Schema<EnquiryDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    userType: {
      type: String,
      required: true,
      trim: true,
    },

    interest: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: [
        "New",
        "Contacted",
        "In Progress",
        "Closed",
      ] satisfies EnquiryStatus[],
      default: "New",
    },
  },
  {
    timestamps: true,
  },
);

const Enquiry = mongoose.model<EnquiryDocument>("Enquiry", enquirySchema);

export default Enquiry;
