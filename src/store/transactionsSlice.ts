import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Transaction } from '../types/transaction';
import { getDBConnection, createTables, getAllTransactions, insertTransaction, deleteTransaction } from '../db/database';

interface TransactionsState {
  items: Transaction[];
  loading: boolean;
  error?: string;
}

const initialState: TransactionsState = {
  items: [],
  loading: false,
};

export const loadTransactions = createAsyncThunk(
  'transactions/load',
  async () => {
    const db = await getDBConnection();
    await createTables(db);
    const raw = await getAllTransactions(db);
    console.log('Loaded transactions from DB:', raw);
    return raw as Transaction[];
  },
);

export const addTransaction = createAsyncThunk(
  'transactions/add',
  async (txn: Omit<Transaction, 'id'>, { dispatch }) => {
    const db = await getDBConnection();
    await insertTransaction(db, txn);
    // reload after insert
    const raw = await getAllTransactions(db);
    console.log('Reloaded transactions after insert:', raw);
    return raw as Transaction[];
  },
);

export const removeTransaction = createAsyncThunk(
  'transactions/remove',
  async (id: number) => {
    const db = await getDBConnection();
    await deleteTransaction(db, id);
    const raw = await getAllTransactions(db);
    return raw as Transaction[];
  },
);

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadTransactions.pending, state => {
        state.loading = true;
      })
      .addCase(loadTransactions.fulfilled, (state, action: PayloadAction<Transaction[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(loadTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addTransaction.fulfilled, (state, action: PayloadAction<Transaction[]>) => {
        state.items = action.payload;
      })
      .addCase(removeTransaction.fulfilled, (state, action: PayloadAction<Transaction[]>) => {
        state.items = action.payload;
      });
  },
});

export default transactionsSlice.reducer;
