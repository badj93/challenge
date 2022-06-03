import { makeAutoObservable } from 'mobx';
import { transactions } from '../services';

export interface Transaction {
  transactionID: string;
  cardAccount: string;
  cardID: string;
  amount: string;
  currency: string;
  transactionDate: string;
  merchantInfo: string;
}

interface TransactionsStore {
  transactions: Record<string, Transaction>;
  getTransactionById: (transactionId?: string) => Transaction;
  setTransactions: (transactions: Transaction[]) => void;
  getTransactions: () => Transaction[];
}

class Transactions implements TransactionsStore {
  transactions: Record<string, Transaction> = Object.create(null);

  constructor() {
    makeAutoObservable(this);
    this.setTransactions(transactions);
  }

  getTransactions() {
    return Object.values(this.transactions);
  }

  setTransactions(transactions: Transaction[]) {
    for (const transaction of transactions) {
      this.transactions[transaction.transactionID] = transaction;
    }
  }

  getTransactionById(transactionId?: string) {
    if (transactionId) {
      const transaction = this.transactions[transactionId];

      if (transaction) {
        return transaction;
      }

      throw new Error(`transaction with id ${transactionId} was not found`);
    }

    throw new Error('transactionId is required');
  }
}

export const transactionsStore = new Transactions();
