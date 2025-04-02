"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const userAuthController_1 = require("../controllers/usersController/userAuthController");
const validate_1 = __importDefault(require("../validations/validate"));
const express_validator_1 = require("express-validator");
const userAuthValidate_1 = require("../validations/userAuthValidate");
const utils_1 = require("../utils");
const router = express_1.default.Router();
router.post('/signup', (0, validate_1.default)((0, express_validator_1.checkSchema)(userAuthValidate_1.userSignupValidation)), userAuthController_1.userSignUpController);
router.post('/login', (0, validate_1.default)((0, express_validator_1.checkSchema)(userAuthValidate_1.userLoginValidation)), userAuthController_1.userLoginController);
router.get('/:userId/profile', utils_1.tokenVerifier, userAuthController_1.getUserProfileController);
module.exports = router;
