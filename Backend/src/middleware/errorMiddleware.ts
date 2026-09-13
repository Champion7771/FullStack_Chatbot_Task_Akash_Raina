import { Request, Response, NextFunction } from "express";

const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(error);

  res.status(500).json({
    message: "Something went wrong on the server.",
  });
};

export default errorMiddleware;
