import enums from '../../shared/lib/enums';
import { errorResponse } from '../../shared/lib/api-response';
import AuthService from './services';
import HashText from '../../shared/utils/hashing';
import { NextFunction, Request, Response } from 'express';

class AuthMiddleware {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    validatePassword = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> => {
        try {
            const {
                user,
                body: { password },
            } = req;
            const verifyHash = await HashText.verifyHash(
                password,
                String(user?.password)
            );

            if (!verifyHash) {
                return errorResponse(
                    res,
                    enums.INVALID_LOGIN_DETAILS,
                    enums.HTTP_UNAUTHORIZED
                );
            }
            return next();
        } catch (err) {
            return next(err);
        }
    };

    validatePin =
            async (req: Request, res: Response, next: NextFunction): Promise<any> => {
                try {
                    const {
                        user,
                        body: { pin },
                    } = req;

                    const verifyHash = await HashText.verifyHash(
                        pin,
                        String(user?.transaction_pin)
                    );
                    if (!verifyHash) {
                        return errorResponse(
                            res,
                            enums.INVALID_PIN,
                            enums.HTTP_BAD_REQUEST
                        );
                    }
                    return next();
                } catch (err) {
                    return next(err);
                }
            };

    hashData =
        (type = '') => async (
        req: Request,
        _res: Response,
        next: NextFunction
    ): Promise<any> => {
        try {
            const {
                body: { password, transactionPin },
            } = req;
            let hash;
            if(type === 'password'){
                hash = await HashText.getHash(password);
                req.body.password = hash
            }
            else if(type === 'pin'){
                hash = await HashText.getHash(transactionPin);
                req.body.transactionPin = hash
            }
            return next();
        } catch (error) {
            return next(error);
        }
    };

    getUser =
        (type = '') =>
            async (req: Request, res: Response, next: NextFunction): Promise<any> => {
                try {
                    const {
                        body: { email }
                    } = req;
                    const user = await this.authService.getUserByEmail(email);

                    if (!user && type === 'authenticate') {
                        return errorResponse(
                            res,
                            enums.NOT_FOUND('User'),
                            enums.HTTP_NOT_FOUND
                        );
                    }
                    if (user && type === 'validate' ) {
                        return errorResponse(
                            res,
                            enums.ALREADY_IN_USE('email'),
                            enums.HTTP_BAD_REQUEST
                        );
                    }

                    req.user = user;
                    return next();
                } catch (err) {
                    return next(err);
                }
            };

    checkUserPhoneNumber = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> => {
        try {
            const {
                body: { phoneNumber },
            } = req;

            const user = await this.authService.getUserByPhoneNumber(phoneNumber);

            if (user) {
                return errorResponse(
                    res,
                    enums.ALREADY_IN_USE('Phone number'),
                    enums.HTTP_BAD_REQUEST
                );
            }
            return next();
        } catch (err) {
            return next(err);
        }
    };

    getAuthToken = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> => {
        try {
            let token: any = req.headers.authorization;
            if (!token) {
                return errorResponse(res, enums.NO_TOKEN, enums.HTTP_UNAUTHORIZED);
            }

            if (!token.startsWith('Bearer ')) {
                return errorResponse(
                    res,
                    enums.INVALID('Token'),
                    enums.HTTP_UNAUTHORIZED
                );
            }

            if (token.startsWith('Bearer ')) {
                token = token.slice(7, token.length);
            }

            req.token = token;
            return next();
        } catch (err) {
            return next(err);
        }
    };

    validateUserAuthToken = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> => {
        try {
            const { token }: any = req;
            const decoded: any = HashText.decodeToken(token);

            if (decoded.message) {
                if (decoded.message === 'jwt expired') {
                    return errorResponse(
                        res,
                        enums.SESSION_EXPIRED,
                        enums.HTTP_UNAUTHORIZED
                    );
                }
                return errorResponse(res, decoded.message, enums.HTTP_UNAUTHORIZED);
            }

            const user = await this.authService.getUserById(decoded.data.user_id);

            if (!user) {
                return errorResponse(
                    res,
                    enums.USER_NOT_EXIST,
                    enums.HTTP_UNAUTHORIZED
                );
            }

            req.user = user;
            return next();
        } catch (err) {
            return next(err);
        }
    };
}

export const authMiddleware = new AuthMiddleware();
