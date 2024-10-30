import express from 'express';
import {authMiddleware} from "../authentication/middlewares";
import {paymentController} from "./controller";
import {paymentValidator} from "./validators";
import {paymentMiddleware} from "./middlewares";

const Router = express.Router();

Router.post(
    '/fund-wallet',
    authMiddleware.getAuthToken,
    authMiddleware.validateUserAuthToken,
    paymentValidator.validateFundWallet,
    paymentMiddleware.checkUserWalletExists,
    paymentController.fundWallet
);

Router.post(
    '/withdraw-fund',
    authMiddleware.getAuthToken,
    authMiddleware.validateUserAuthToken,
    paymentValidator.validateWithdrawal,
    authMiddleware.validatePin,
    paymentMiddleware.checkUserWalletExists,
    paymentMiddleware.checkWalletBalance,
    paymentController.withdrawFunds
);

Router.post(
    '/wallet-to-wallet/transfer',
    authMiddleware.getAuthToken,
    authMiddleware.validateUserAuthToken,
    paymentValidator.validateWalletToWalletFunding,
    paymentMiddleware.checkUserWalletExists,
    paymentController.walletToWalletFunding
);

export const paymentRouter = Router;
