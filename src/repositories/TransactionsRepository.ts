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
    return {
      income: this.getTotalIncomeOrOutcome('income'),
      outcome: this.getTotalIncomeOrOutcome('outcome'),
      total: this.getTotalBalance(),
    };
  }

  private getTotalIncomeOrOutcome(operation: string): number {
    return this.transactions
      .filter(transaction => transaction.type === operation)
      .reduce((acc, currentValue) => acc + currentValue.value, 0);
  }

  public getTotalBalance(): number {
    const totalIncome = this.getTotalIncomeOrOutcome('income');
    const totalOutcome = this.getTotalIncomeOrOutcome('outcome');

    return totalIncome - totalOutcome;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
