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
exports.getArtistProfileService = exports.artistLoginService = exports.artistSignupService = void 0;
const statusCodes_1 = __importDefault(require("../../constants/statusCodes"));
const artistModel_1 = require("../../models/artistModel");
const index_1 = require("../../utils/index");
const artistSignupService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    let { password } = payload, body = __rest(payload, ["password"]);
    password = yield (0, index_1.hashPassword)(password);
    const user = new artistModel_1.Artist(Object.assign(Object.assign({}, body), { password }));
    yield user.save();
    user.password = "";
    return (0, index_1.messageHandler)(true, "Artist registered successfully", statusCodes_1.default.SUCCESS, user);
});
exports.artistSignupService = artistSignupService;
const artistLoginService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const artist = yield artistModel_1.Artist.findOne({ email });
    if (!artist) {
        return (0, index_1.messageHandler)(false, 'Wrong email or password', statusCodes_1.default.UNAUTHORIZED, {});
    }
    if (yield (0, index_1.verifyPassword)(password, artist.password)) {
        const credentials = (0, index_1.tokenHandler)("artist", String(artist._id));
        return (0, index_1.messageHandler)(true, 'Artist logged-in successfully', statusCodes_1.default.SUCCESS, credentials);
    }
    else {
        return (0, index_1.messageHandler)(false, 'Wrong email or password', statusCodes_1.default.UNAUTHORIZED, {});
    }
});
exports.artistLoginService = artistLoginService;
const getArtistProfileService = (artistId) => __awaiter(void 0, void 0, void 0, function* () {
    const artist = yield artistModel_1.Artist.findById(artistId);
    if (artist == null) {
        return (0, index_1.messageHandler)(false, "Artist does not exist", statusCodes_1.default.BAD_REQUEST, {});
    }
    artist.password = "";
    return (0, index_1.messageHandler)(true, "Artist found successfully", statusCodes_1.default.SUCCESS, artist);
});
exports.getArtistProfileService = getArtistProfileService;
