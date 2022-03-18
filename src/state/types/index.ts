import { FirebaseError } from 'firebase/app'
import { StudySet } from '../../common/types'

export interface StudySetsState {
  studySets: Array<StudySet>
  isLoading: boolean
}

export type UserStudySetPayload = {
  userId: string
}

export type StudySetItemPayload = {
  userId: string
}

export interface User {
  displayName: string
  email: string
  uid: string
}

export interface AuthState {
  isAuthorized: boolean
  errorMessage?: string
  uiMessage?: string
}

export interface UserState {
  user: User | null
  authState: AuthState
}

export interface AuthError {
  user: null
  error: FirebaseError
}

export type LoginWithEmailAsyncThunkConfig = {
  rejectValue: AuthError
}

export interface loginPayload {
  email: string
  password: string
}

export interface passWordResetAsyncThunkConfig {
  rejectValue: string
}
