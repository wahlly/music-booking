"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Artist = void 0;
const mongoose_1 = require("mongoose");
const artistSchema = new mongoose_1.Schema({
    birthName: {
        type: String,
        required: true
    },
    stageName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    wallet: {
        balance: { type: Number, default: 0 }
    }
});
const Artist = (0, mongoose_1.model)('Artist', artistSchema, 'artists');
exports.Artist = Artist;
