"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorMiddleware = (error, req, res, next) => {
    console.error(error);
    res.status(500).json({
        message: "Something went wrong on the server.",
    });
};
exports.default = errorMiddleware;
