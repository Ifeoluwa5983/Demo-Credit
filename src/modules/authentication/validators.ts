import Joi, { Schema } from 'joi';
import enums from '../../shared/lib/enums';
import { Request, Response, NextFunction } from 'express';
import { errorResponse } from '../../shared/lib/api-response';

class AuthValidator {
    // constructor() {}

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

    loginValidator: (req: Request, res: Response, next: NextFunction) => any =
        async (req, res, next) => {
            const schema = Joi.object({
                email: Joi.string().email().min(3).required(),
                password: Joi.string().min(8).required(),
            });

            this.validateRequestBody(req, res, next, schema);
        };

    createUserValidator = (req: Request, res: Response, next: NextFunction) => {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            countryCode: Joi.string()
                .min(1)
                .max(3)
                .pattern(/^\d{1,3}$/)
                .messages({
                    'string.pattern.base':
                        'Numeric country code must be between 1 and 3 digits.',
                })
                .required()
                .messages({
                    'any.required': 'Country code is required.',
                }),
            phoneNumber: Joi.string()
                .pattern(/^\+?[0-9\s\-()]{7,15}$/)
                .required()
                .messages({
                    'string.pattern.base':
                        'Phone number must be a valid format and contain between 7 and 15 digits.',
                    'any.required': 'Phone number is required.',
                }),
            password: Joi.string()
                .min(8)
                .max(30)
                .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
                .required()
                .messages({
                    'string.min': 'Password must be at least 8 characters long.',
                    'string.pattern.base':
                        'Password must contain at least one letter, one number, and one special character.',
                    'any.required': 'Password is required.',
                }),
            country: Joi.string().required(),
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            transactionPin: Joi.string().required().max(4).min(4)
        });

        this.validateRequestBody(req, res, next, schema);
    };


    private handleError = (
        res: Response,
        message: string,
        statusCode: number
    ) => {
        errorResponse(res, message, statusCode);
    };
}

export const authValidator = new AuthValidator();
