"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoginValidation = exports.userSignupValidation = void 0;
exports.userSignupValidation = {
    name: {
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
exports.userLoginValidation = {
    email: {
        notEmpty: true,
        errorMessage: "email is required"
    },
    password: {
        notEmpty: true,
        errorMessage: "password is required"
    }
};
