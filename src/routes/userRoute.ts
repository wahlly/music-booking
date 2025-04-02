import express from "express";
import { userLoginController, userSignUpController, getUserProfileController } from "../controllers/usersController/userAuthController";
import validate from "../validations/validate";
import { checkSchema } from "express-validator";
import { userLoginValidation, userSignupValidation } from "../validations/userAuthValidate";
import { tokenVerifier } from "../utils";
const router = express.Router()

router.post('/signup', validate(checkSchema(userSignupValidation)), userSignUpController)
router.post('/login', validate(checkSchema(userLoginValidation)), userLoginController)
router.get('/:userId/profile', tokenVerifier, getUserProfileController)

export = router