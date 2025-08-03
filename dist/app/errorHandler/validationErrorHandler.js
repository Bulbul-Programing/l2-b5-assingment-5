"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationErrorHandler = void 0;
const ValidationErrorHandler = (err) => {
    console.log(err);
    const errorSources = [];
    const errors = Object.values(err.errors);
    errors.forEach((errorObject) => errorSources.push({
        path: errorObject.path,
        message: errorObject.message
    }));
    return {
        statusCode: 400,
        message: "Validation Error",
        errorSources
    };
};
exports.ValidationErrorHandler = ValidationErrorHandler;
