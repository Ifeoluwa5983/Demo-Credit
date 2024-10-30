import 'express';
import { User } from '../../modules/authentication/interfaces';
import {Wallet} from "../../modules/payments/interfaces";

declare global {
  namespace Express {
    interface Request {
      user?: User;
      wallet?: Wallet | null;
      validatedBody?: any;
      hashed?: string;
      token?: string;
    }
  }
}
