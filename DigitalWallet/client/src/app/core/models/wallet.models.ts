export type TransactionType = 'Deposit' | 'Withdrawal';

export interface Transaction {
  id: number;
  amount: number;
  type: TransactionType;
  date: string;
  description: string;
  balanceAfter: number;
}

export interface TransactionRequest {
  amount: number;
  type: TransactionType;
  description: string;
}

export interface WalletBalance {
  currentBalance: number;
  transactions: Transaction[];
  lastUpdate: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
