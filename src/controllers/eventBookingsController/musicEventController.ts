import statusCodes from "../../constants/statusCodes";
import {
      newMusicEventService,
      initializeMusicEventBookingService,
      completeMusicEventBookingService
} from "../../services/eventBookings/musicEventService";
import { Request, Response } from "express"

export const newMusicEventController = async (req: Request, res: Response) => {
      try {
            const result = await newMusicEventService(req.body);

          res.status(result.statusCode).json(result)
      } catch (error: any) {
          res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message })
      }
}

export const initializeMusicEventBookingController = async (req: Request, res: Response) => {
      try {
            const result = await initializeMusicEventBookingService(req.body)

            res.status(result.statusCode).json(result)
      } catch (error: any) {
            res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message })
      }
}

export const completeMusicEventBookingController = async (req: Request, res: Response) => {
      try {
            const result = await completeMusicEventBookingService(req.body)

            res.status(result.statusCode).json(result)
      } catch (error: any) {
            res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message })
      }
}