import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { firebaseValue } from '../../firebase'
import { FirebaseError } from 'firebase/app'
import { reset } from '../studySet/studySetsSlice'
import { loginPayload, LoginWithEmailAsyncThunkConfig, passWordResetAsyncThunkConfig, User, UserState } from '../types'

const initialState: UserState = {
  user: null,
  authState: {
    isLoading: false,
    isAuthorized: false,
  },
}

export const signInWithGoogle = createAsyncThunk('userSlice/signWithGoogle', async () => {
  const user = await firebaseValue.api.signInWithGoogle()

  const { displayName, email, uid } = user
  return { displayName, email, uid }
})

export const singUpWithEmail = createAsyncThunk(
  'userSlice/signUpWithEmail',
  async ({ email, password }: { email: string; password: string }) => {
    const user = await firebaseValue.api.signUpWithEmail(email, password)
    if (user) {
      const { displayName, email, uid } = user
      return { displayName, email, uid }
    } else {
      return null
    }
  }
)

export const loginWithEmail = createAsyncThunk<User, loginPayload, LoginWithEmailAsyncThunkConfig>(
  'userSlice/loginWithEmail',
  async ({ email, password }, { rejectWithValue }) => {
    const response = await firebaseValue.api.loginWithEmail(email, password)
    if (response instanceof FirebaseError) {
      let uiMessage = ''
      if (response.code === 'auth/wrong-password') {
        uiMessage = 'Please check the password'
      }
      if (response.code === 'auth/user-not-found') {
        uiMessage = 'Please check the Email'
      }
      return rejectWithValue({ user: null, error: uiMessage })
    } else {
      const { displayName, email, uid } = response
      return { displayName, email, uid } as User
    }
  }
)

export const logOut = createAsyncThunk('userSlice/logOut', async (_, { dispatch }) => {
  await firebaseValue.api.logOut(firebaseValue.auth).then(() => dispatch(loggedOut()))
  dispatch(reset())
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

export const passwordReset = createAsyncThunk<string, { email: string }, passWordResetAsyncThunkConfig>(
  'userSlice/resetPassword',
  async ({ email }, { rejectWithValue }) => {
    const response = await firebaseValue.api.resetPassword(email)
    if (response instanceof FirebaseError) {
      return rejectWithValue(response.message)
    }
    return response
  }
)

export const getUserStreakData = createAsyncThunk('userSlice/getStreakData', async (uid: string) => {
  const data = await firebaseValue.api.getUserStreakData(uid)
  return data
})

export const UserSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    validateUser(state, action) {
      if (!action.payload) {
        state.authState.isAuthorized = false
      } else {
        state.user = action.payload
        state.authState.isAuthorized = true
      }
    },
    loggedOut(state) {
      state.user = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInWithGoogle.fulfilled, (state, action) => {
        state.user = action.payload as User
        state.authState.isLoading = false
      })
      .addCase(singUpWithEmail.fulfilled, (state, action) => {
        state.user = action.payload as User
        state.authState.isLoading = false
      })
      .addCase(loginWithEmail.rejected, (state, action) => {
        if (action.payload) {
          const { error } = action.payload
          if (error) {
            state.authState.isAuthorized = false
            state.authState.uiMessage = error
          }
        }
      })
      .addCase(loginWithEmail.fulfilled, (state, action) => {
        state.user = action.payload
        state.authState.isAuthorized = true
      })
      .addCase(passwordReset.rejected, (state, action) => {
        state.authState.uiMessage = action.payload
      })
      .addCase(passwordReset.fulfilled, (state, action) => {
        state.authState.uiMessage = action.payload
      })
      .addCase(getUserStreakData.fulfilled, (state, action) => {
        if (state.user) {
          state.user.streakData = action.payload as number[]
          state.authState.isLoading = false
        }
      })
      .addMatcher(isAnyOf(verifyAuth.pending, signInWithGoogle.pending, loginWithEmail.pending, getUserStreakData.pending), (state) => {
        state.authState.isLoading = true
      })
  },
})
export const { validateUser, loggedOut } = UserSlice.actions

export const selectUser = (state: RootState) => state.auth

export default UserSlice.reducer
