import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { fetchUserStudySets, getStudySetData, addStudySet } from './api'
import { firebaseConfig } from './firebaseConfig'

const app = initializeApp(firebaseConfig)
const db = getFirestore()
const api = {
  getStudySetData,
  fetchUserStudySets,
  addStudySet,
}
export const firebaseValue = { app, db, api }
