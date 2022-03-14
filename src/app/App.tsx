import GlobalStyle from '../theme/GlobalStyles'
import { Navbar } from '../components/Navbar/Navbar'
import { useAppSelector } from './hooks'
import { useFirebase } from '../firebase/firebaseContextProvider'
import { fetchUserStudySets } from '../state/studySet/studySetsSlice'
import { useCallback, useEffect } from 'react'

function App() {
  const studySets = useAppSelector((state) => state.collections.studySets)
  const { dispatch } = useFirebase()

  const fetchStudySets = useCallback(async () => {
    dispatch(fetchUserStudySets('user1')).unwrap()
  }, [studySets])

  useEffect(() => {
    if (!studySets.length) {
      fetchStudySets()
    }
  }, [])

  return (
    <>
      <GlobalStyle />
      <Navbar />
    </>
  )
}

export default App
