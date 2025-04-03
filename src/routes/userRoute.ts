import express from "express";
import { userLoginController, userSignUpController, getUserProfileController } from "../controllers/usersController/userAuthController";
import validate from "../validations/validate";
import { checkSchema } from "express-validator";
import { userLoginValidation, userSignupValidation } from "../validations/userAuthValidate";
import { tokenVerifier } from "../utils";
import { getArtistProfileController } from "../controllers/artistsController/artistAuthController";
import { completeEventBookingValidation, initializeEventBookingValidation } from "../validations/eventBookingValidate";
import { completeMusicEventBookingController, initializeMusicEventBookingController } from "../controllers/eventBookingsController/musicEventController";
const router = express.Router()

router.post('/signup', validate(checkSchema(userSignupValidation)), userSignUpController)
router.post('/login', validate(checkSchema(userLoginValidation)), userLoginController)
router.get('/:userId/profile', tokenVerifier, getUserProfileController)

router.get('/:userId/artist-profile/:artistId/', tokenVerifier, getArtistProfileController)

router.post("/event/booking/initialize", tokenVerifier, validate(checkSchema(initializeEventBookingValidation)), initializeMusicEventBookingController)
router.post("/event/booking/complete", tokenVerifier, validate(checkSchema(completeEventBookingValidation)), completeMusicEventBookingController)

export = router