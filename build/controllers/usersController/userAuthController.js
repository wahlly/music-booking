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
exports.getUserProfileController = exports.userLoginController = exports.userSignUpController = void 0;
const statusCodes_1 = __importDefault(require("../../constants/statusCodes"));
const userAuthService_1 = require("../../services/users/userAuthService");
const userSignUpController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, userAuthService_1.userSignupService)(req.body);
        res.status(result.statusCode).json(result);
    }
    catch (error) {
        res.status(statusCodes_1.default.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message });
    }
});
exports.userSignUpController = userSignUpController;
const userLoginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, userAuthService_1.userLoginService)(req.body);
        res.status(result.statusCode).json(result);
    }
    catch (error) {
        res.status(statusCodes_1.default.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message });
    }
});
exports.userLoginController = userLoginController;
const getUserProfileController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, userAuthService_1.getUserProfileService)(req.params.userId);
        res.status(result.statusCode).json(result);
    }
    catch (error) {
        res.status(statusCodes_1.default.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message });
    }
});
exports.getUserProfileController = getUserProfileController;
