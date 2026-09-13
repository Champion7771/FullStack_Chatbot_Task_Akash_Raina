import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoSanitize from "@exortek/express-mongo-sanitize";

import enquiryRoutes from "./routes/enquiryRoutes";
import errorMiddleware from "./middleware/errorMiddleware";
import authRoutes from "./routes/authRoutes";

const app = express();

app.use(
  cors({
    origin: "https://full-stack-chatbot-task-akash-raina.vercel.app", // no trailing slash
    credentials: true,
  }),
);

app.use(express.json());
app.use(mongoSanitize());

app.use(cookieParser());

app.get("/", (_req, res) => {
  res.json({
    message: "DroneTV Backend is running",
  });
});

app.use("/api/auth", authRoutes);

app.use("/api/enquiries", enquiryRoutes);

app.use(errorMiddleware);

export default app;
