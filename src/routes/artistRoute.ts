import express from "express";
import { artistLoginController, artistSignUpController, getArtistProfileController } from "../controllers/artistsController/artistAuthController";
import validate from "../validations/validate";
import { checkSchema } from "express-validator";
import { artistLoginValidation, artistSignupValidation } from "../validations/artistAuthValidate";
import { tokenVerifier } from "../utils";
const router = express.Router()

router.post('/signup', validate(checkSchema(artistSignupValidation)), artistSignUpController)
router.post('/login', validate(checkSchema(artistLoginValidation)), artistLoginController)
router.get('/:artistId/profile', tokenVerifier, getArtistProfileController)

export = router