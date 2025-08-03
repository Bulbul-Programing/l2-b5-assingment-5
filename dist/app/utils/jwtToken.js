"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.creteToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const creteToken = (jwtPayload, jwtSecret, expire) => {
    const token = jsonwebtoken_1.default.sign(jwtPayload, jwtSecret, { expiresIn: expire });
    return token;
};
exports.creteToken = creteToken;
const verifyToken = (token, secret) => {
    const verifyToken = jsonwebtoken_1.default.verify(token, secret);
    return verifyToken;
};
exports.verifyToken = verifyToken;
