import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import studySetsReducer from '../state/studySet/studySetsSlice'
import userReducer from '../state/user/userSlice'

export const store = configureStore({
  reducer: {
    collections: studySetsReducer,
    auth: userReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
