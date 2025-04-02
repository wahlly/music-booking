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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenVerifier = exports.tokenHandler = exports.verifyPassword = exports.hashPassword = exports.messageHandler = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const statusCodes_1 = __importDefault(require("../constants/statusCodes"));
const messageHandler = (success, message, statusCode, data) => {
    return { success, message, statusCode, data };
};
exports.messageHandler = messageHandler;
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield bcrypt_1.default.genSalt(10);
    return yield bcrypt_1.default.hash(password, salt);
});
exports.hashPassword = hashPassword;
const verifyPassword = (password, dbPassword) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt_1.default.compare(password, dbPassword);
});
exports.verifyPassword = verifyPassword;
/**
 *
 * @param userType ["user"|"artist"]
 * @param userId
 * @returns
 */
const tokenHandler = (userType, userId) => {
    const id = userType == "user" ? "userId" : "artistId";
    var token = jsonwebtoken_1.default.sign({ [`${id}`]: userId }, process.env.SECRET_KEY, { expiresIn: "1d" });
    return { token, [`${id}`]: userId };
};
exports.tokenHandler = tokenHandler;
const tokenVerifier = (req, res, next) => {
    try {
        if (req.get('Authorization') != undefined) {
            const token = req.get('Authorization').replace("Bearer ", "");
            jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, (err, decoded) => {
                if (err) {
                    return res.status(statusCodes_1.default.UNAUTHORIZED).json({ success: false, message: "Unauthorized, session expired", statusCode: 401, data: {} });
                }
                req.payload = decoded;
                next();
            });
        }
        else {
            return res.status(statusCodes_1.default.UNAUTHORIZED).json({ success: false, message: "Unauthorized, Access Denied", statusCode: 401, data: {} });
        }
    }
    catch (error) {
        return res.status(statusCodes_1.default.UNAUTHORIZED).json({ success: false, message: "Unauthorized, Access Denied", statusCode: 401, data: {} });
    }
};
exports.tokenVerifier = tokenVerifier;
