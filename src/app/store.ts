import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import studySetsReducer from '../state/studySetForm/studySetsSlice'

export const store = configureStore({
  reducer: {
    collections: studySetsReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
