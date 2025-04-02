import statusCodes from "../../constants/statusCodes";
import {userLoginService, userSignupService, getUserProfileService} from "../../services/users/userAuthService"
import {Request, Response} from 'express'

export const userSignUpController = async (req: Request, res: Response) => {
      try {
            const result = await userSignupService(req.body);

          res.status(result.statusCode).json(result)
      } catch (error: any) {
          res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message })
      }
}

export const userLoginController = async (req: Request, res: Response) => {
      try {
            const result = await userLoginService(req.body);

          res.status(result.statusCode).json(result)
      } catch (error: any) {
          res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message })
      }
}

export const getUserProfileController = async (req: Request, res: Response) => {
      try {
            const result = await getUserProfileService(req.params.userId);

          res.status(result.statusCode).json(result)
      } catch (error: any) {
          res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message })
      }
}