import bcrypt from 'bcrypt'
import { NextFunction, Response, Request } from 'express'
import jwt from 'jsonwebtoken'
import statusCodes from '../constants/statusCodes'

export interface messageHandlerI {
      success: boolean
      message: string
      statusCode: number
      data: object
}

export const messageHandler = (success: boolean, message: string, statusCode: number, data: object): messageHandlerI => {
      return {success, message, statusCode, data}
}

export const hashPassword = async (password: string) => {
      const salt = await bcrypt.genSalt(10)
      return await bcrypt.hash(password, salt)
}

export const verifyPassword = async (password: string, dbPassword: string): Promise<Boolean> => {
      return await bcrypt.compare(password, dbPassword)
}

/**
 * 
 * @param userType ["user"|"artist"]
 * @param userId 
 * @returns 
 */
export const tokenHandler = (userType: string, userId: string) => {
      const id = userType == "user" ? "userId" : "artistId"
      var token = jwt.sign({ [`${id}`]: userId }, process.env.SECRET_KEY as string, {expiresIn: "1d"});
      return { token, [`${id}`]: userId };
}

declare module "express-serve-static-core" {
      interface Request {
            payload?: {
                  [key: string]: any
            }
      }
}

export const tokenVerifier = (req: Request, res: Response, next: NextFunction): any => {
      try {
            if(req.get('Authorization') != undefined){
                  const token: string = req.get('Authorization')!.replace("Bearer ", "")
                  jwt.verify(token, process.env.SECRET_KEY as jwt.Secret, (err, decoded: any) => {
                        if (err) {
                              return res.status(statusCodes.UNAUTHORIZED).json({success: false, message: "Unauthorized, session expired", statusCode: 401, data: {}})
                        }

                        req.payload = decoded
                        next()
                  })
            } else{
                  return res.status(statusCodes.UNAUTHORIZED).json({success: false, message: "Unauthorized, Access Denied", statusCode: 401, data: {}})
            }
      } catch (error) {
            return res.status(statusCodes.UNAUTHORIZED).json({success: false, message: "Unauthorized, Access Denied", statusCode: 401, data: {}})
      }
}

export const AlphaNumeric = (length: number, type = "alphaNumeric"): string => {
      let result = "";
      const characters = type === "alphaNumeric" ? "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
            : type === "alpha" ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
            : "0123456789";
      const charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }

      return result
}

export const calculatePaystackServiceFee = (amount: number) => {
      let processingCharges = amount < 2500 ? (0.015 * amount) : (0.015 * amount) + 100
      return Math.round(processingCharges) > 2000 ? 2000 : Math.round(processingCharges)
}