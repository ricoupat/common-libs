import { Request, Response, NextFunction } from "express";
import { HttpError } from "../errors/HttpError";

export function errorHandler(
    err: unknown,
    _req: Request,
    res: Response,
    _next: NextFunction
) {
    if (err instanceof HttpError) {
        return res.status(err.status).json({
            error: err.message,
            code: err.code,
            details: err.details,
        });
    }

    console.error("Unexpected error:", err);

    return res.status(500).json({
        error: "Internal Server Error",
        code: "INTERNAL_ERROR",
    });
}