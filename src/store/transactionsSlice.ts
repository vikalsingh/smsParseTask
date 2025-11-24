import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Transaction } from '../types/transaction';

interface TransactionsState {
  items: Transaction[];
  loading: boolean;
  error?: string;
}

const initialState: TransactionsState = {
  items: [],
  loading: false,
};


const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
});

export default transactionsSlice.reducer;
