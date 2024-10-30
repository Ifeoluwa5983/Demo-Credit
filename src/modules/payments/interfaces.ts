export type TransactionData = {
    walletId: number | undefined,
    amount: number,
    fees: number,
    balance: number,
    reference: string,
    transactionType: 'credit' | 'debit'
}

export type UpdateWallet = {
    balance?: number;
    currency?: string;
}

export interface Wallet {
    id: number;
    user_id: number;
    currency: string;
    balance: number;
    created_at: Date;
    updated_at: Date;
}
