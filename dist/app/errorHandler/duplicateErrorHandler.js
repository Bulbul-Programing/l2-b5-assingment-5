"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.duplicateErrorHandler = void 0;
const duplicateErrorHandler = (err) => {
    const matchedArray = err.message.match(/"([^"]*)"/);
    return {
        statusCode: 400,
        message: `${matchedArray[1]} already exists!!`
    };
};
exports.duplicateErrorHandler = duplicateErrorHandler;
