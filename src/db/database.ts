import SQLite, { SQLiteDatabase } from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

const DB_NAME = 'smart_expense.db';

export const getDBConnection = async (): Promise<SQLiteDatabase> => {
  return SQLite.openDatabase({ name: DB_NAME, location: 'default' });
};

export const createTables = async (db: SQLiteDatabase) => {
  // transactions
  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      amount REAL NOT NULL,
      type TEXT NOT NULL,
      date TEXT NOT NULL,
      bankName TEXT,
      description TEXT,
      category TEXT,
      source TEXT
    );
  `);

  // bank accounts
  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS bank_accounts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      bankName TEXT NOT NULL,
      currentBalance REAL NOT NULL
    );
  `);
};

// export const getAllTransactions = async (db: SQLiteDatabase) => {
//   const results = await db.executeSql('SELECT * FROM transactions ORDER BY date DESC');
//   const items: any[] = [];
//   results.forEach(result => {
//     for (let i = 0; i < result.rows.length; i++) {
//       items.push(result.rows.item(i));
//     }
//   });
//   return items;
// };

export const insertTransaction = async (
  db: SQLiteDatabase,
  txn: Omit<import('../types/transaction').Transaction, 'id'>,
) => {
  const query = `
    INSERT INTO transactions
      (amount, type, date, bankName, description, category, source)
    VALUES (?, ?, ?, ?, ?, ?, ?);
  `;
  const params = [
    txn.amount,
    txn.type,
    txn.date,
    txn.bankName,
    txn.description,
    txn.category,
    txn.source,
  ];
  await db.executeSql(query, params);
};

export const deleteTransaction = async (db: SQLiteDatabase, id: number) => {
  await db.executeSql('DELETE FROM transactions WHERE id = ?;', [id]);
};
