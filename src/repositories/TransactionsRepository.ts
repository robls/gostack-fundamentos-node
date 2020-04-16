import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  private balance = {
    income: 0,
    outcome: 0,
    total: 0,
  };

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    return this.balance;
  }

  public checkIfBalanceIsNegative(type: string, value: number): boolean {
    if (type === 'outcome') {
      const diff = this.balance.total - value;
      if (diff < 0) {
        return true;
      }
      return false;
    }
    return false;
  }

  public create({ title, type, value }: Transaction): Transaction {
    const transaction = new Transaction({ title, type, value });

    if (type === 'income') {
      this.balance.income += value;
    } else {
      this.balance.outcome += value;
    }

    this.transactions.push(transaction);

    this.balance.total = this.transactions.reduce((acc, curr) => {
      if (curr.type === 'income') {
        return acc + curr.value;
      }
      return acc - curr.value;
    }, 0);

    return transaction;
  }
}

export default TransactionsRepository;
