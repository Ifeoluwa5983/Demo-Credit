import { Request, Response } from 'express';
import PaymentService from './services';
import { TransactionData, UpdateWallet } from './interfaces';
import { v4 as uuidv4 } from 'uuid';
import {errorResponse, success} from "../../shared/lib/api-response";
import enums from "../../shared/lib/enums";

class PaymentController {
    private paymentService: PaymentService;

    constructor() {
        this.paymentService = new PaymentService();
    }

    fundWallet = async (req: Request, res: Response): Promise<any> => {
        try {
            const { amount } = req.body;
            const { wallet } = req

            const walletId = wallet?.id || 0
            let reference = `TXN_${uuidv4()}`;

            const newBalance = parseFloat(String(wallet?.balance)) + parseFloat(String(amount));

            const transactionData: TransactionData = {
                walletId,
                amount,
                fees: 0,
                balance: newBalance,
                reference,
                transactionType: 'credit',
            };
            await this.paymentService.createTransaction(transactionData);

            const updateData: UpdateWallet = { balance: newBalance };
            await this.paymentService.updateWallet(walletId, updateData);

            success(
                res,
                enums.SUCCESSFUL_WALLET_FUNDING,
                enums.HTTP_OK,
                transactionData
            );
        } catch (err) {
            errorResponse(res, err.message, enums.HTTP_INTERNAL_SERVER_ERROR);
        }
    }


    withdrawFunds = async (req: Request, res: Response): Promise<any> => {
        try {
            const { amount } = req.body;
            const { wallet } = req

            const walletId = wallet?.id || 0
            let reference = `TXN_${uuidv4()}`;

            const newBalance = parseFloat(String(wallet?.balance)) - parseFloat(String(amount));

            const transactionData: TransactionData = {
                walletId,
                amount,
                fees: 0,
                balance: newBalance,
                reference,
                transactionType: 'debit',
            };
            await this.paymentService.createTransaction(transactionData);

            const updateData: UpdateWallet = { balance: newBalance };
            await this.paymentService.updateWallet(walletId, updateData);

            success(
                res,
                enums.SUCCESSFUL_WITHDRAWAL,
                enums.HTTP_OK,
                transactionData
            );
        } catch (err) {
            errorResponse(res, err.message, enums.HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    // walletToWalletFunding = async (req: Request, res: Response): Promise<void> => {
    //     try {
    //         const { currency, sendToUserId, amount } = req.body;
    //
    //         await this.paymentService.fundWallet(walletIdFrom, walletIdTo, amount);
    //
    //         success(
    //             res,
    //             enums.SUCCESSFUL_WITHDRAWAL,
    //             enums.HTTP_OK,
    //             transactionData
    //         );
    //     } catch (err) {
    //         errorResponse(res, err.message, enums.HTTP_INTERNAL_SERVER_ERROR);
    //     }
    // }
}

export const paymentController = new PaymentController();
