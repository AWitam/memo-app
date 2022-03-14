import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { fetchUserStudySets, getStudySetData, addStudySet, editStudySetSummary, editStudySetTerms, deleteStudySet } from './api'
import { firebaseConfig } from './firebaseConfig'

function initializeFirebase() {
  const app = initializeApp(firebaseConfig)
  const db = getFirestore()
  const api = {
    getStudySetData,
    fetchUserStudySets,
    addStudySet,
    editStudySetSummary,
    editStudySetTerms,
    deleteStudySet,
  }
  return { app, db, api }
}

export const firebaseValue = initializeFirebase()
