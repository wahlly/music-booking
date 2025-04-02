"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.artistLoginValidation = exports.artistSignupValidation = void 0;
exports.artistSignupValidation = {
    birthName: {
        notEmpty: true,
        errorMessage: "name is required"
    },
    stageName: {
        notEmpty: true,
        errorMessage: "name is required"
    },
    email: {
        notEmpty: true,
        errorMessage: "email is required"
    },
    password: {
        notEmpty: true,
        errorMessage: "password is required"
    }
};
exports.artistLoginValidation = {
    email: {
        notEmpty: true,
        errorMessage: "email is required"
    },
    password: {
        notEmpty: true,
        errorMessage: "password is required"
    }
};
