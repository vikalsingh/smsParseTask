import { Transaction, TransactionType, Category } from '../types/transaction';

const BANK_KEYWORDS = ['AXIS', 'HDFC', 'SBI', 'ICICI'];

const AMOUNT_REGEX = /(?:INR|Rs\.?)\s?([\d,]+\.?\d{0,2})/i;
const DEBIT_KEYWORDS = ['debited', 'spent', 'purchase', 'withdrawn'];
const CREDIT_KEYWORDS = ['credited', 'received', 'deposit'];

const detectType = (text: string): TransactionType => {
  const low = text.toLowerCase();
  if (DEBIT_KEYWORDS.some(k => low.includes(k))) return 'debit';
  if (CREDIT_KEYWORDS.some(k => low.includes(k))) return 'credit';
  return 'debit';
};

const detectBank = (senderOrText: string): string => {
  const upper = senderOrText.toUpperCase();
  for (const b of BANK_KEYWORDS) {
    if (upper.includes(b)) return b;
  }
  return 'Unknown';
};

export const parseSmsToTransaction = (
  smsBody: string,
  senderId: string,
): Transaction | null => {
  const amountMatch = smsBody.match(AMOUNT_REGEX);
  if (!amountMatch) return null;

  const amount = parseFloat(amountMatch[1].replace(/,/g, ''));
  const type = detectType(smsBody);
  const bankName = detectBank(senderId);

  const txn: Transaction = {
    amount,
    type,
    date: new Date().toISOString(),
    bankName,
    description: smsBody.slice(0, 120),
    category: type === 'credit' ? 'salary' : 'others',
    source: 'sms',
  };

  return txn;
};
