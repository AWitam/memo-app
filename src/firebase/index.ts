import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { fetchUserStudySets, addStudySet, editStudySetSummary, deleteStudySet } from './api/studySetServices'
import { editStudySetTerms, getStudySetTerms } from './api/termsServices'
import { signInWithGoogle, logOut, signUpWithEmail, loginWithEmail, resetPassword } from './api/userServices'
import { firebaseConfig } from './firebaseConfig'

function initializeFirebase() {
  const app = initializeApp(firebaseConfig)
  const db = getFirestore()
  const auth = getAuth(app)
  const api = {
    getStudySetTerms,
    fetchUserStudySets,
    addStudySet,
    editStudySetSummary,
    editStudySetTerms,
    deleteStudySet,
    signUpWithEmail,
    signInWithGoogle,
    loginWithEmail,
    logOut,
    resetPassword,
  }
  return { app, auth, db, api }
}

export const firebaseValue = initializeFirebase()
