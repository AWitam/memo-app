import type { ThunkAction, Action } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import studySetsReducer from '../state/studySet/studySetsSlice';
import termsReducer from '../state/studySet/termsSlice';
import userReducer from '../state/user/userSlice';

export const store = configureStore({
  reducer: {
    collections: studySetsReducer,
    termsData: termsReducer,
    auth: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
