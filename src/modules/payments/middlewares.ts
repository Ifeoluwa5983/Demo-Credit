import { Request, Response, NextFunction } from 'express';
import { errorResponse } from '../../shared/lib/api-response';
import PaymentService from './services';
import enums from '../../shared/lib/enums';

class PaymentMiddleware {
    private paymentService: PaymentService;

    constructor() {
        this.paymentService = new PaymentService();
    }

    checkUserWalletExists = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> => {
        try {
            const { body } = req;
            const { user } = req;

            const wallet = await this.paymentService.fetchUserWalletByCurrency(
                user?.id,
                body.currency
            );

            if (!wallet) {
                console.log(
                    `${enums.CURRENT_TIME_STAMP}, Info: confirms that user does not have a wallet with currency ${body.currency} in PaymentMiddleware`
                );
                return errorResponse(
                    res,
                    enums.NOT_FOUND('Wallet'),
                    enums.HTTP_BAD_REQUEST
                );
            }

            req.wallet = wallet;
            return next();
        } catch (error) {
            next(error);
        }
    };

    checkWalletBalance = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> => {
        try {
            const { body } = req;
            const { wallet } = req;

            const balance = wallet?.balance;

            if (balance && balance < body.amount) {
                return errorResponse(
                    res,
                    enums.INSUFFICIENT_BALANCE,
                    enums.HTTP_BAD_REQUEST
                );
            }

            return next();
        } catch (error) {
            next(error);
        }
    };
}

export const paymentMiddleware = new PaymentMiddleware();
