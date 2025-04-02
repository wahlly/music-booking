"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userRoute_1 = __importDefault(require("./userRoute"));
const artistRoute_1 = __importDefault(require("./artistRoute"));
const route = (app) => {
    app.use("/user", userRoute_1.default);
    app.use("/artist", artistRoute_1.default);
};
exports.default = route;
