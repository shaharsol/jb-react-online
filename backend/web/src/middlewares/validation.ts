import { NextFunction, Response, Request } from "express";
import { ObjectSchema } from 'joi' 

export default function validation(validator: ObjectSchema) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            req.body = await validator.validateAsync(req.body)
            next()
        } catch (e) {
            next({
                status: 422,
                message: e.message
            })
        }
    }
}
