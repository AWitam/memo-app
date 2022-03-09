import { createContext, useEffect, useContext, useState } from 'react'
import { collection, Firestore, getDocs, getFirestore } from 'firebase/firestore'
import { firebaseConfig } from './firebaseConfig'
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import { initializeApp } from 'firebase/app'
import { fetchUserStudySets, getStudySetData } from './api'
import { firebaseValue } from '.'

type FirebaseContextProviderProps = {
  children: React.ReactNode
}

const FirebaseContext = createContext<{ firebaseValue: any; dispatch: any } | undefined>(undefined)

function FirebaseContextProvider({ children }: any) {
  const dispatch = useDispatch()

  return <FirebaseContext.Provider value={{ firebaseValue, dispatch }}>{children}</FirebaseContext.Provider>
}

function useFirebase() {
  const context = useContext(FirebaseContext)
  if (context === undefined) {
    throw new Error('fail')
  }

  return context
}

export { FirebaseContextProvider, useFirebase }
