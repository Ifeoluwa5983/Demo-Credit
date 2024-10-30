import Joi, { Schema } from 'joi';
import enums from '../../shared/lib/enums';
import { Request, Response, NextFunction } from 'express';
import { errorResponse } from '../../shared/lib/api-response';

class PaymentValidator {
    private validateRequestBody(
        req: Request,
        res: Response,
        next: NextFunction,
        schema: Schema
    ): any {
        const { body } = req;
        const { error, value } = schema.validate(body);

        if (error) {
            this.handleError(
                res,
                error.details[0].message.replace(/"/g, ''),
                enums.HTTP_UNPROCESSABLE_ENTITY
            );
        } else {
            req.validatedBody = value;
            next();
        }
    }


    validateFundWallet: (req: Request, res: Response, next: NextFunction) => any = async (
        req,
        res,
        next
    ) => {
        const schema = Joi.object({
            amount: Joi.number().min(100).required(),
            currency: Joi.string().required(),
        });

        this.validateRequestBody(
            req,
            res,
            next,
            schema
        );
    };

    validateWithdrawal: (req: Request, res: Response, next: NextFunction) => any =
        async (req, res, next) => {
            const schema = Joi.object({
                amount: Joi.number().required(),
                currency: Joi.string().required(),
                accountNumber: Joi.string().required(),
                accountName: Joi.string().required(),
                bankCode: Joi.string().required(),
                bankName: Joi.string().required(),
                recipientEmail: Joi.string().email(),
                pin: Joi.string().min(4).required(),
                narration: Joi.string().optional(),
            });

            this.validateRequestBody(
                req,
                res,
                next,
                schema
            );
        };

    private readonly handleError = (
        res: Response,
        message: string,
        statusCode: number
    ) => {
        errorResponse(res, message, statusCode);
    };
}

export const paymentValidator = new PaymentValidator();
