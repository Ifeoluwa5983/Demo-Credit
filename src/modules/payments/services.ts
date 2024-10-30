import {db} from '../../config/database';
import {TransactionData, UpdateWallet, Wallet} from "./interfaces";
import { v4 as uuidv4 } from 'uuid';

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

    walletToWalletFunding = async (senderId: number | undefined, receiverId: number, currency: string, amount: number): Promise<any> => {
        return await db.transaction(async () => {
            const senderWallet = await this.fetchUserWalletByCurrency(senderId, currency);
            const receiverWallet = await this.fetchUserWalletByCurrency(receiverId, currency);

            if (!senderWallet) throw new Error('Sender wallet not found');
            if (!receiverWallet) throw new Error('Receiver wallet not found');

            const newSenderBalance = parseFloat(String(senderWallet.balance)) - amount;
            if (newSenderBalance < 0) throw new Error('Insufficient funds in sender wallet');

            const newReceiverBalance = parseFloat(String(receiverWallet.balance)) + amount;

            const referenceSender = `TXN_${uuidv4()}`;
            const referenceReceiver = `TXN_${uuidv4()}`;

            const senderTransaction: TransactionData = {
                walletId: senderWallet.id,
                amount: -amount,
                fees: 0,
                balance: newSenderBalance,
                reference: referenceSender,
                transactionType: 'debit',
            };
            await this.createTransaction(senderTransaction);

            const receiverTransaction: TransactionData = {
                walletId: receiverWallet.id,
                amount: amount,
                fees: 0,
                balance: newReceiverBalance,
                reference: referenceReceiver,
                transactionType: 'credit',
            };
            await this.createTransaction(receiverTransaction);

            await this.updateWallet(senderWallet.id, { balance: newSenderBalance });
            await this.updateWallet(receiverWallet.id, { balance: newReceiverBalance });

            return { senderTransaction, receiverTransaction };
        });
    };
}
export default PaymentService;
