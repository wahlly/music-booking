"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const artistAuthController_1 = require("../controllers/artistsController/artistAuthController");
const validate_1 = __importDefault(require("../validations/validate"));
const express_validator_1 = require("express-validator");
const artistAuthValidate_1 = require("../validations/artistAuthValidate");
const utils_1 = require("../utils");
const router = express_1.default.Router();
router.post('/signup', (0, validate_1.default)((0, express_validator_1.checkSchema)(artistAuthValidate_1.artistSignupValidation)), artistAuthController_1.artistSignUpController);
router.post('/login', (0, validate_1.default)((0, express_validator_1.checkSchema)(artistAuthValidate_1.artistLoginValidation)), artistAuthController_1.artistLoginController);
router.get('/:artistId/profile', utils_1.tokenVerifier, artistAuthController_1.getArtistProfileController);
module.exports = router;
