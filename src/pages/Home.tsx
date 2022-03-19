import { useAppSelector } from '../app/hooks'
import { Link } from 'react-router-dom'
import { ROUTES } from '../app/routes'
import { CollectionPage } from './CollectionPage/CollectionPage'
import { useEffect } from 'react'

import { useDispatch } from 'react-redux'
import { fetchUserStudySets } from '../state/studySet/studySetsSlice'

export const Home = () => {
  const isLoading = useAppSelector((state) => state.collections.isLoading)
  const studySets = useAppSelector((state) => state.collections.studySets)
  const user = useAppSelector((state) => state.auth.user)
  const dispatch = useDispatch()

  useEffect(() => {
    if (studySets.length < 1) {
      user && dispatch(fetchUserStudySets(user.uid))
    }
  }, [user, studySets])

  return (
    <div>
      <h2>Home</h2>
      {isLoading && <div>loading ...</div>}
      {studySets && studySets.length > 0 ? (
        <CollectionPage />
      ) : (
        <div>
          {!isLoading && studySets.length === 0 && (
            <div>
              <h2>No study sets yet!</h2>{' '}
              <Link to={ROUTES.newStudySet}>
                <button>Create study set</button>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
