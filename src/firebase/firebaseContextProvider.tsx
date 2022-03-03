import { createContext, useEffect, useContext, useState } from 'react'
import { FirebaseApp, initializeApp } from 'firebase/app'
import { Firestore, getFirestore } from 'firebase/firestore'
import { firebaseConfig } from './firebaseConfig'

import { AppDispatch } from '../app/store'
import { useAppDispatch } from '../app/hooks'

type FirebaseContextProviderProps = {
  children: React.ReactNode
}

export interface FirebaseContext {
  app: FirebaseApp
  db: Firestore
}

const initialValue = {
  app: null,
  db: null,
}

const FirebaseContext = createContext<{ firebaseValue: FirebaseContext; dispatch: AppDispatch } | undefined>(undefined)

function FirebaseContextProvider({ children }: FirebaseContextProviderProps) {
  const [firebaseValue, setFirebaseValue] = useState<any>(initialValue)

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!firebaseValue.app) {
      const app = initializeApp(firebaseConfig)
      const db = getFirestore(app)
      setFirebaseValue({ app, db })
    }
  }, [])

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
