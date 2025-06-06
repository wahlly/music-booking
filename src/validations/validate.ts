import { validationResult, ValidationChain } from 'express-validator';
import { Request, Response, NextFunction } from 'express'
import statusCodes from '../constants/statusCodes';

const validate = (validations: ValidationChain[]) => {
      return async (req: Request, res: Response, next: NextFunction) => {
            await Promise.all(validations.map(validation => validation.run(req)));

            const errors = validationResult(req);
            if (errors.isEmpty()) {
                  return next();
            }

            res.status(statusCodes.BAD_REQUEST).json({
                  success: false,
                  errors: errors.array()
            });
      };
};

export default validate