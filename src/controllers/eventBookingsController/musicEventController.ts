import statusCodes from "../../constants/statusCodes";
import { newMusicEventService } from "../../services/eventBookings/musicEventService";
import { Request, Response } from "express"

export const newMusicEventController = async (req: Request, res: Response) => {
      try {
            const result = await newMusicEventService(req.body);

          res.status(result.statusCode).json(result)
      } catch (error: any) {
          res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message })
      }
}