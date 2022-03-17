import { Auth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'

export const signInWithGoogle = async (auth: Auth) => {
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

export const logOut = async (auth: Auth) => {
  await signOut(auth)
}
