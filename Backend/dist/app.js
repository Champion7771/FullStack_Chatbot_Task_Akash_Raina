"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_mongo_sanitize_1 = __importDefault(require("@exortek/express-mongo-sanitize"));
const enquiryRoutes_1 = __importDefault(require("./routes/enquiryRoutes"));
const errorMiddleware_1 = __importDefault(require("./middleware/errorMiddleware"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express_1.default.json());
app.use((0, express_mongo_sanitize_1.default)());
app.use((0, cookie_parser_1.default)());
app.get("/", (_req, res) => {
    res.json({
        message: "DroneTV Backend is running",
    });
});
app.use("/api/auth", authRoutes_1.default);
app.use("/api/enquiries", enquiryRoutes_1.default);
app.use(errorMiddleware_1.default);
exports.default = app;
