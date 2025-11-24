export type TransactionType = 'debit' | 'credit';

export type TransactionSource = 'sms' | 'manual';

export type Category =
  | 'food'
  | 'shopping'
  | 'bills'
  | 'travel'
  | 'salary'
  | 'others';

export interface Transaction {
  id?: number;
  amount: number;
  type: TransactionType;
  date: string;
  bankName: string;
  description: string;
  category: Category;
  source: TransactionSource;
}
