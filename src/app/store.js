import { configureStore } from '@reduxjs/toolkit';
import bookDataReducer from '../features/books/bookSlice';

export const store = configureStore({
  reducer: {
    bookData: bookDataReducer,
  },
});
