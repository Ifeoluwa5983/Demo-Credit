import express from 'express';
import { authController } from './controller';
import { authMiddleware } from './middlewares';
import { authValidator } from './validators';

const Router = express.Router();

Router.post(
    '/signup',
    authValidator.createUserValidator,
    authMiddleware.getUser('validate'),
    authMiddleware.checkUserPhoneNumber,
    authMiddleware.hashData('password'),
    authMiddleware.hashData('pin'),
    authController.signupUser
);


Router.post(
    '/login',
    authValidator.loginValidator,
    authMiddleware.getUser('authenticate'),
    authMiddleware.getUser('login'),
    authMiddleware.validatePassword,
    authController.login
);


export const authRouter = Router;
