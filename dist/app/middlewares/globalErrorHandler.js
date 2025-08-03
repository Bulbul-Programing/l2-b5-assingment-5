"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const zodErrorHandler_1 = require("../errorHandler/zodErrorHandler");
const env_1 = require("../config/env");
const duplicateErrorHandler_1 = require("../errorHandler/duplicateErrorHandler");
const castErrorHandler_1 = require("../errorHandler/castErrorHandler");
const validationErrorHandler_1 = require("../errorHandler/validationErrorHandler");
const AppError_1 = require("../errorHandler/AppError");
const globalErrorHandler = (err, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let errorSources = [];
    let statusCode = 500;
    let message = 'Something Went wrong!';
    // Zod Error Handle
    if (err.name === 'ZodError') {
        const sanitizeError = (0, zodErrorHandler_1.ZodErrorHandler)(err);
        statusCode = sanitizeError.statusCode;
        message = sanitizeError.message;
        errorSources = sanitizeError.errorSources || [];
    }
    // Duplicate Error handler
    else if (err.code === 11000) {
        const sanitizeError = (0, duplicateErrorHandler_1.duplicateErrorHandler)(err);
        statusCode = sanitizeError.statusCode;
        message = sanitizeError.message;
    }
    // Cast Error
    else if (err.name === 'CastError') {
        const sanitizeError = (0, castErrorHandler_1.castErrorHandler)(err);
        statusCode = sanitizeError.statusCode;
        message = sanitizeError.message;
    }
    // Validation Error
    else if (err.name === 'ValidationError') {
        const sanitizeError = (0, validationErrorHandler_1.ValidationErrorHandler)(err);
        statusCode = sanitizeError.statusCode;
        message = sanitizeError.message;
    }
    else if (err instanceof AppError_1.AppError) {
        statusCode = err.statusCode;
        message = err.message;
    }
    else if (err instanceof Error) {
        statusCode = 500;
        message = err.message;
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        err: env_1.envVars.NODE_ENV === "development" ? err : null,
        stack: env_1.envVars.NODE_ENV === "development" ? err.stack : null
    });
});
exports.globalErrorHandler = globalErrorHandler;
