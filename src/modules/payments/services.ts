import {db} from '../../config/database';
import {TransactionData, UpdateWallet, Wallet} from "./interfaces";

class PaymentService {

    constructor() {}

    updateWallet = async (userId: number, data: UpdateWallet): Promise<any>  => {
        try {
            await db('wallets')
                .where('id', userId)
                .update({
                    ...data,
                    updated_at: new Date(),
        });
        } catch (error) {
            throw new Error(`Error updating wallet: ${error.message}`);
        }
    };


    createTransaction = async (data: TransactionData): Promise<any> => {
        try {
            const { walletId, amount, fees, balance, reference, transactionType } = data;
            await db('wallet_transactions').insert({
                wallet_id: walletId,
                amount,
                fees,
                balance,
                reference,
                transaction_type: transactionType,
                created_at: new Date(),
            });
        } catch (error) {
            throw new Error(`Error creating transaction: ${error.message}`);
        }
    }


    async fetchUserWalletByCurrency(userId: number | undefined , currency: string): Promise<Wallet | null> {
        try {
            const wallet = await db('wallets')
                .where({ user_id: userId, currency })
                .first();

            return wallet || null;
        } catch (error) {
            throw new Error(`Error fetching wallet: ${error.message}`);
        }
    }
}
export default PaymentService;
