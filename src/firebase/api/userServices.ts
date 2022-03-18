import { FirebaseError } from 'firebase/app'
import {
  Auth,
  AuthError,
  AuthErrorCodes,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
} from 'firebase/auth'
import { firebaseValue } from '..'

export const signUpWithEmail = async (email: string, password: string) => {
  const auth = firebaseValue.auth
  const userCredential = await createUserWithEmailAndPassword(auth, email, password)
  if (userCredential) {
    const user = userCredential.user
    return user
  }
}

export const signInWithGoogle = async () => {
  const auth = firebaseValue.auth
  const provider = new GoogleAuthProvider()
  provider.setCustomParameters({
    prompt: 'select_account',
  })
  const result = await signInWithPopup(auth, provider)

  const credential = GoogleAuthProvider.credentialFromResult(result)
  const token = credential?.accessToken
  const user = result.user
  return user
}

export const loginWithEmail = async (email: string, password: string) => {
  const auth = firebaseValue.auth

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return userCredential.user
  } catch (error) {
    return error as FirebaseError
  }
}

export const logOut = async (auth: Auth) => {
  await signOut(auth)
}

export const resetPassword = async (email: string) => {
  const auth = firebaseValue.auth
  try {
    await sendPasswordResetEmail(auth, email)
    return 'Email sent'
  } catch (error) {
    return error as FirebaseError
  }
}
