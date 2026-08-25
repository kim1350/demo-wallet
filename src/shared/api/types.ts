export interface Asset {
  id: string;
  name: string;
  ticker: string;
  amount: number;
  fiatValue: number;
  changePct: number;
}

export interface Balance {
  totalFiat: number;
  changePct: number;
}

export type TransactionDirection = 'in' | 'out';
export type TransactionStatus = 'pending' | 'confirmed' | 'failed';

export interface Transaction {
  id: string;
  direction: TransactionDirection;
  status: TransactionStatus;
  assetTicker: string;
  amount: number;
  fiatValue: number;
  counterparty: string;
  hash: string;
  createdAt: string;
}

export interface SendRequest {
  assetId: string;
  recipient: string;
  amount: number;
}

export interface SendResult {
  transaction: Transaction;
}
