import { createContext, useContext } from 'react'
import { useDispatch } from 'react-redux'
import { firebaseValue } from '.'

const FirebaseContext = createContext<{ firebaseValue: any; dispatch: any } | undefined>(undefined)

function FirebaseContextProvider({ children }: any) {
  const dispatch = useDispatch()
  // todo: auth provider

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
