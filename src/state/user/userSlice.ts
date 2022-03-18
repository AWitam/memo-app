import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { string } from 'prop-types'
import { useDispatch } from 'react-redux'
import { RootState } from '../../app/store'
import { firebaseValue } from '../../firebase'

interface User {
  displayName: string
  email: string
  uid: string
}

interface UserState {
  user: User | null
}
const initialState: UserState = {
  user: null,
}

export const signInWithGoogle = createAsyncThunk('userSlice/signWithGoogle', async (_, { dispatch }) => {
  const user = await firebaseValue.api.signInWithGoogle(firebaseValue.auth)

  const { displayName, email, uid } = user
  return { displayName, email, uid }
})

export const logOut = createAsyncThunk('userSlice/logOut', async (_, { dispatch }) => {
  await firebaseValue.api.logOut(firebaseValue.auth).then(() => dispatch(loggedOut()))
})

export const verifyAuth = createAsyncThunk('userSlice/verifyAuth', async (_, { dispatch }) => {
  firebaseValue.auth.onAuthStateChanged((user) => {
    if (user) {
      const { uid, email, displayName } = user
      return dispatch(validateUser({ uid, email, displayName }))
    } else {
      return dispatch(validateUser(null))
    }
  })
})

export const UserSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    validateUser(state, action) {
      state.user = action.payload
    },
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
export const { validateUser, loggedOut } = UserSlice.actions

export const selectUser = (state: RootState) => state.auth

export default UserSlice.reducer
