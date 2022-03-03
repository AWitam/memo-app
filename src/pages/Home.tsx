import { useAppSelector } from '../app/hooks'
import { Link, Outlet } from 'react-router-dom'
import { ROUTES } from '../app/routes'
import { Collection } from './Collection'
import { useContext, useMemo, useState } from 'react'
import { useFirebase } from '../firebase/firebaseContextProvider'
import { fetchUserStudySets, selectStudySets, StudySet } from '../state/studySetForm/studySetsSlice'
import { FlashCardField } from '../components/StudySetForm/StudySetForm'
import { collection } from '@firebase/firestore'
import { useEffect } from 'react'
import { Navbar } from '../components/Navbar/Navbar'

export const Home = () => {
  // todo: create auth logic

  const studySets = useAppSelector((state) => state.collections.studySets)
  const {
    firebaseValue: { app, db },
    dispatch,
  } = useFirebase()

  const [isDb, setDb] = useState(false)

  const fetchStudySets = async () => {
    try {
      const studySetsRef = collection(db, 'studySets')
      const res = await dispatch(fetchUserStudySets({ userId: 'user1', studySetsRef })).unwrap()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (db && !studySets.length) {
      fetchStudySets()
    }
  }, [db])

  return (
    <div>
      <h2>Home</h2>
      {studySets && studySets.length > 0 ? (
        <Collection />
      ) : (
        <div>
          <h2>No study sets yet!</h2>
          <Link to={ROUTES.newStudySet}>
            <button>Create study set</button>
          </Link>
        </div>
      )}
    </div>
  )
}
