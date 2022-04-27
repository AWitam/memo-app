import { StudySet, TermItem } from '../../common/types';

export interface StudySetsState {
  studySets: Array<StudySet>;
  isLoading: boolean;
}

export type UserStudySetPayload = {
  userId: string;
};

export type StudySetItemPayload = {
  userId: string;
};

export interface User {
  displayName: string;
  email: string;
  uid: string;
  streakData: number[];
}

export interface AuthState {
  isLoading: boolean;
  isAuthorized: boolean;
  errorMessage?: string;
  uiMessage?: string;
}

export interface UserState {
  user: User | null;
  authState: AuthState;
}

export interface AuthError {
  user: null;
  error: string;
}

export type LoginWithEmailAsyncThunkConfig = {
  rejectValue: AuthError;
};

export interface loginPayload {
  email: string;
  password: string;
}

export interface passWordResetAsyncThunkConfig {
  rejectValue: string;
}

export interface Terms {
  termsId: string;
  termItems: Array<TermItem>;
}

export interface TermsState {
  terms: Terms[];
  isLoading: boolean;
}
