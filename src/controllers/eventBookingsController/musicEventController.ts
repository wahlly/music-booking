import statusCodes from "../../constants/statusCodes";
import {
      newMusicEventService,
      initializeMusicEventBookingService,
      completeMusicEventBookingService,
      getMusicEventService,
      getMusicEventsByParamService
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

export const getMusicEventController = async (req: Request, res: Response) => {
      try {
            const result = await getMusicEventService(req.params)

            res.status(result.statusCode).json(result)
      } catch (error: any) {
            res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message })
      }
}

export const getMusicEventsByParamController = async (req: Request, res: Response) => {
      try {
            const result = await getMusicEventsByParamService(req.query)

            res.status(result.statusCode).json(result)
      } catch (error: any) {
            res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message })
      }
}