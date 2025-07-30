import { NextFunction, Request, Response } from "express";
import { TErrorSources } from "../interface/error.type";
import { ZodErrorHandler } from "../errorHandler/zodErrorHandler";
import { envVars } from "../config/env";
import { duplicateErrorHandler } from "../errorHandler/duplicateErrorHandler";
import { castErrorHandler } from "../errorHandler/castErrorHandler";
import { ValidationErrorHandler } from "../errorHandler/validationErrorHandler";
import { AppError } from "../errorHandler/AppError";


export const globalErrorHandler = async (err: any, req: Request, res: Response, next: NextFunction) => {

    let errorSources: TErrorSources[] = []
    let statusCode = 500
    let message = 'Something Went wrong!'

    // Zod Error Handle
    if (err.name === 'ZodError') {
        const sanitizeError = ZodErrorHandler(err)
        statusCode = sanitizeError.statusCode;
        message = sanitizeError.message;
        errorSources = sanitizeError.errorSources || []
    }

    // Duplicate Error handler
    else if (err.code === 11000) {
        const sanitizeError = duplicateErrorHandler(err)
        statusCode = sanitizeError.statusCode;
        message = sanitizeError.message;
    }

    // Cast Error
    else if (err.name === 'CastError') {
        const sanitizeError = castErrorHandler(err)
        statusCode = sanitizeError.statusCode;
        message = sanitizeError.message;
    }

    // Validation Error
    else if (err.name === 'ValidationError') {
        const sanitizeError = ValidationErrorHandler(err)
        statusCode = sanitizeError.statusCode;
        message = sanitizeError.message;
    }
    else if (err instanceof AppError) {
        statusCode = err.statusCode
        message = err.message
    }

    else if (err instanceof Error) {
        statusCode = 500;
        message = err.message
    }



    res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        err: envVars.NODE_ENV === "development" ? err : null,
        stack: envVars.NODE_ENV === "development" ? err.stack : null
    })
}