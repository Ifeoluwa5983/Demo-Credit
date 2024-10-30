import { Request, Response } from 'express';
import AuthService from './services';
import {errorResponse, success} from "../../shared/lib/api-response";
import enums from "../../shared/lib/enums";
import countries from 'i18n-iso-countries';
import countryCodes from 'country-list';

export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    signupUser = async (req: Request, res: Response): Promise<any> => {
        try {
            const { firstName, lastName, email, password, phoneNumber, country, countryCode, transactionPin } = req.body;

            const karmaResult = await this.authService.checkKarma(email);

            if (karmaResult.status !== enums.HTTP_NOT_FOUND) {
                return errorResponse(res, enums.BLACKLISTED_EMAIL, enums.HTTP_UNAUTHORIZED);
            }
            const user = await this.authService.signupUser({ firstName, lastName, email, password, phoneNumber, country,
                countryCode, transactionPin });

            const retrievedCountryCode: any = countryCodes.getCode(country);
            const currency = countries.alpha2ToAlpha3(retrievedCountryCode);

            if (!currency) {
                throw new Error(`Invalid country: ${country}`);
            }

            await this.authService.createWallet(user.id, currency);

            return success(res, enums.CREATED_SUCCESSFULLY('User'), enums.HTTP_OK, user);
        } catch (err) {
            return errorResponse(res, err.message, enums.HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    login = async (req: Request, res: Response): Promise<any> => {
        try {
            const { user } = req;
            const { data } = await this.authService.login(user);
            let userData;
            if (user) {
                const { password, ...rest } = user;

                userData = {
                    ...rest,
                    token: data.token,
                    expires: data.expires,
                };
            }
            return success(res, enums.LOGIN_SUCCESSFUL, enums.HTTP_OK, userData);
        } catch (err) {
            return errorResponse(res, err.message, enums.HTTP_INTERNAL_SERVER_ERROR);
        }
    };
}

export const authController = new AuthController();
