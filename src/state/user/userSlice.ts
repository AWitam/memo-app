import { applyMiddleware, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { User } from 'firebase/auth'
import { RootState } from '../../app/store'
import { firebaseValue } from '../../firebase'
import { fetchUserStudySets } from '../studySet/studySetsSlice'

interface UserState {
  user: User | null
}
const initialState: UserState = {
  user: null,
}

export const signInWithGoogle = createAsyncThunk('userSlice/signWithGoogle', async (_, { dispatch }) => {
  const user = await firebaseValue.api.signInWithGoogle(firebaseValue.auth)
  dispatch(fetchUserStudySets(user.uid))

  const { displayName, email, uid } = user
  return { displayName, email, uid }
})
export const logOut = createAsyncThunk('userSlice/logOut', async (_, { dispatch }) => {
  await firebaseValue.api.logOut(firebaseValue.auth).then(() => dispatch(loggedOut()))
})

export const UserSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    loggedOut(state) {
      state.user = null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signInWithGoogle.fulfilled, (state, action) => {
      //@ts-ignore
      state.user = action.payload
    })
  },
})
export const { loggedOut } = UserSlice.actions

export const selectUser = (state: RootState) => state.auth

export default UserSlice.reducer
