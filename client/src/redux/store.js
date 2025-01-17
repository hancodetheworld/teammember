import { configureStore } from '@reduxjs/toolkit';
import membersReducer from './membersSlice';

export const store = configureStore({
  reducer: {
    members: membersReducer,
  },
});