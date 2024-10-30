import {db} from '../../config/database';
import {UserData} from "./interfaces";
import TokenService from "./tokenService";
import axios from 'axios';
import config from "../../config/env/index";

class AuthService {

    private tokenService: TokenService;

    constructor() {
        this.tokenService = new TokenService();
    }

    signupUser = async (data: UserData): Promise<any> => {
        const {firstName, lastName, email, password, phoneNumber, country, countryCode, transactionPin} = data;
        try {
            await db('users')
                .insert({
                    first_name: firstName,
                    last_name: lastName,
                    email,
                    password,
                    phone_number: phoneNumber,
                    country: country,
                    country_code: countryCode,
                    transaction_pin: transactionPin,
                    created_at: new Date(),
                    updated_at: new Date(),
                });

            const [result] = await db('users')
                .select('*')
                .where('email', email);

            return result;
        } catch (error) {
            throw new Error(`Error signing up user: ${error.message}`);
        }
    }

    getUserByEmail = async (email: string): Promise<any> => {
        try {
            return await db('users')
                .select('id', 'first_name', 'last_name', 'password', 'email', 'phone_number', 'country',
                    'country_code', 'created_at', 'updated_at')
                .where('email', email)
                .first();
        } catch (error) {
            throw new Error(`Error fetching user by email: ${error.message}`);
        }
    }

    getUserByPhoneNumber = async (phoneNumber: string): Promise<any> => {
        try {
            return await db('users')
                .select('id', 'first_name', 'last_name', 'email', 'phone_number', 'country',
                    'country_code', 'created_at', 'updated_at')
                .where('phone_number', phoneNumber)
                .first();
        } catch (error) {
            throw new Error(`Error fetching user by email: ${error.message}`);
        }
    }

    getUserById = async (id: number): Promise<any> => {
        try {
            return await db('users')
                .select('id', 'first_name', 'last_name', 'email', 'transaction_pin', 'phone_number', 'created_at', 'updated_at')
                .where('id', id)
                .first();
        } catch (error) {
            throw new Error(`Error fetching user by ID: ${error.message}`);
        }
    }

    createWallet = async (userId: number, currency: string): Promise<any> => {
        try {
            await db('wallets')
                .insert({
                    user_id: userId,
                    currency,
                    balance: 0.0,
                    created_at: new Date(),
                    updated_at: new Date(),
                });
        } catch (error) {
            throw new Error(`Error creating wallet: ${error.message}`);
        }
    }

    login = async (user: any): Promise<any> => {
        try {
            const data = await this.tokenService.generateAuthToken(user);
            return {
                data,
            };
        } catch (error) {
        }
    };

    checkKarma = async (identity: string) => {
        try {
            const response = await axios.get(`https://adjutor.lendsqr.com/v2/verification/karma/${identity}`, {
                headers: {
                    Authorization: `Bearer ${config?.KARMA_API_KEY}`
                }
            });
            return response.data;

        } catch (error) {
            console.error('Error during Karma check:', error);
            return error.response;
        }
    };

}

export default AuthService;
