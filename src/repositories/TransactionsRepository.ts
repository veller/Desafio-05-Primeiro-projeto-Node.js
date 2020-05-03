import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface TransactionsAndBalance {
  transactions: Transaction[];
  balance: Balance;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public transactionsAndBalance(): TransactionsAndBalance {
    return {
      transactions: this.all(),
      balance: this.getBalance(),
    };
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const totalIncome = this.transactions
      .filter(transaction => transaction.type === 'income')
      .reduce((acc, currentValue) => acc + currentValue.value, 0);

    const totalOutcome = this.transactions
      .filter(transaction => transaction.type === 'outcome')
      .reduce((acc, currentValue) => acc + currentValue.value, 0);

    const total = totalIncome - totalOutcome;

    return {
      income: totalIncome,
      outcome: totalOutcome,
      total,
    };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
