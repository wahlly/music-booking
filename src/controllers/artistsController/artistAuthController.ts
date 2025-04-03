import statusCodes from "../../constants/statusCodes";
import {artistLoginService, artistSignupService, getArtistProfileService} from "../../services/artists/artistAuthService"
import {Request, Response} from 'express'

export const artistSignUpController = async (req: Request, res: Response) => {
      try {
            const result = await artistSignupService(req.body);

          res.status(result.statusCode).json(result)
      } catch (error: any) {
          res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message })
      }
}

export const artistLoginController = async (req: Request, res: Response) => {
      try {
            const result = await artistLoginService(req.body);

          res.status(result.statusCode).json(result)
      } catch (error: any) {
          res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message })
      }
}

export const getArtistProfileController = async (req: Request, res: Response) => {
      try {
            const source = req.originalUrl.split("/")[1] == "artist" ? "artist" : "user"
            const result = await getArtistProfileService(source, req.params.artistId);

          res.status(result.statusCode).json(result)
      } catch (error: any) {
          res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message })
      }
}