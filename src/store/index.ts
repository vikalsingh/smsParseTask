import { configureStore } from '@reduxjs/toolkit';
import transactionsSlice from './transactionsSlice';

export const store = configureStore({
  reducer: {
    // add here
    transactions: transactionsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
