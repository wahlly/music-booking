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
exports.getArtistProfileController = exports.artistLoginController = exports.artistSignUpController = void 0;
const statusCodes_1 = __importDefault(require("../../constants/statusCodes"));
const artistAuthService_1 = require("../../services/artists/artistAuthService");
const artistSignUpController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, artistAuthService_1.artistSignupService)(req.body);
        res.status(result.statusCode).json(result);
    }
    catch (error) {
        res.status(statusCodes_1.default.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message });
    }
});
exports.artistSignUpController = artistSignUpController;
const artistLoginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, artistAuthService_1.artistLoginService)(req.body);
        res.status(result.statusCode).json(result);
    }
    catch (error) {
        res.status(statusCodes_1.default.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message });
    }
});
exports.artistLoginController = artistLoginController;
const getArtistProfileController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, artistAuthService_1.getArtistProfileService)(req.params.userId);
        res.status(result.statusCode).json(result);
    }
    catch (error) {
        res.status(statusCodes_1.default.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message });
    }
});
exports.getArtistProfileController = getArtistProfileController;
