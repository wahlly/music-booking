import statusCodes from "../../constants/statusCodes";
import {
      userLoginService,
      userSignupService,
      getUserProfileService,
      getUserBookingHistoryService,
      getUserTransactionHistoryService
} from "../../services/users/userAuthService"
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

export const getUserBookingHistoryController = async (req: Request, res: Response) => {
      try {
            const result = await getUserBookingHistoryService(req.query);

          res.status(result.statusCode).json(result)
      } catch (error: any) {
          res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message })
      }
}

export const getUserTransactionHistoryController = async (req: Request, res: Response) => {
      try {
            const result = await getUserTransactionHistoryService(req.query);

          res.status(result.statusCode).json(result)
      } catch (error: any) {
          res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message })
      }
}