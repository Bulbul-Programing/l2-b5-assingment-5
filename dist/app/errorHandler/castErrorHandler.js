"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.castErrorHandler = void 0;
const castErrorHandler = (err) => {
    return {
        statusCode: 400,
        message: "Invalid MongoDB ObjectID. Please provide a valid id"
    };
};
exports.castErrorHandler = castErrorHandler;
