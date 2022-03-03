import { createContext, useEffect, useContext, useState } from 'react'
import { initializeApp } from 'firebase/app'
import { RootState } from '../app/store'
import { selectStudySets } from '../state/studySetForm/studySetsSlice'
import { getFirestore } from 'firebase/firestore'
import { firebaseConfig } from './firebaseConfig'
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'

type FirebaseContextProviderProps = {
  children: React.ReactNode
}

interface Api {
  getAll: (dbRef: any) => void
}

const initialValue = {
  app: undefined,
  db: undefined,
}

const FirebaseContext = createContext<{ firebaseValue: any; dispatch: any } | undefined>(undefined)

function FirebaseContextProvider({ children }: FirebaseContextProviderProps) {
  const [firebaseValue, setFirebaseValue] = useState<any>(initialValue)

  const dispatch = useDispatch()

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
