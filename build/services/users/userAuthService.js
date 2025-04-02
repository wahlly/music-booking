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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserProfileService = exports.userLoginService = exports.userSignupService = void 0;
const statusCodes_1 = __importDefault(require("../../constants/statusCodes"));
const userModel_1 = require("../../models/userModel");
const index_1 = require("../../utils/index");
const userSignupService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    let { password } = payload, body = __rest(payload, ["password"]);
    password = yield (0, index_1.hashPassword)(password);
    const user = new userModel_1.User(Object.assign(Object.assign({}, body), { password }));
    yield user.save();
    user.password = "";
    return (0, index_1.messageHandler)(true, "User registered successfully", statusCodes_1.default.SUCCESS, user);
});
exports.userSignupService = userSignupService;
const userLoginService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const user = yield userModel_1.User.findOne({ email });
    if (!user) {
        return (0, index_1.messageHandler)(false, 'Wrong email or password', statusCodes_1.default.UNAUTHORIZED, {});
    }
    if (yield (0, index_1.verifyPassword)(password, user.password)) {
        const credentials = (0, index_1.tokenHandler)(String(user._id));
        return (0, index_1.messageHandler)(true, 'User logged-in successfully', statusCodes_1.default.SUCCESS, credentials);
    }
    else {
        return (0, index_1.messageHandler)(false, 'Wrong email or password', statusCodes_1.default.UNAUTHORIZED, {});
    }
});
exports.userLoginService = userLoginService;
const getUserProfileService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.User.findById(userId);
    if (user == null) {
        return (0, index_1.messageHandler)(false, "User does not exist", statusCodes_1.default.BAD_REQUEST, {});
    }
    user.password = "";
    return (0, index_1.messageHandler)(true, "User found successfully", statusCodes_1.default.SUCCESS, user);
});
exports.getUserProfileService = getUserProfileService;
