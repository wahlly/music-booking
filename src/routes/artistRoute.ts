import express from "express";
import { artistLoginController, artistSignUpController, getArtistProfileController } from "../controllers/artistsController/artistAuthController";
import validate from "../validations/validate";
import { check, checkSchema } from "express-validator";
import { artistLoginValidation, artistSignupValidation } from "../validations/artistAuthValidate";
import { tokenVerifier } from "../utils";
import { newMusicEventController } from "../controllers/eventBookingsController/musicEventController";
import { musicEventValidation } from "../validations/musicEventValidate";
const router = express.Router()

router.post('/signup', validate(checkSchema(artistSignupValidation)), artistSignUpController)
router.post('/login', validate(checkSchema(artistLoginValidation)), artistLoginController)
router.get('/:artistId/profile', tokenVerifier, getArtistProfileController)

router.post('/event', tokenVerifier, validate(checkSchema(musicEventValidation)), newMusicEventController)

export = router