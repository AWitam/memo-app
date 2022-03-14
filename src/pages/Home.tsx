import { useAppSelector } from '../app/hooks'
import { Link } from 'react-router-dom'
import { ROUTES } from '../app/routes'
import { Collection } from './Collection'

export const Home = () => {
  const isLoading = useAppSelector((state) => state.collections.isLoading)
  const studySets = useAppSelector((state) => state.collections.studySets)
  return (
    <div>
      <h2>Home</h2>
      {isLoading && <div>loading ...</div>}
      {studySets && studySets.length > 0 ? (
        <Collection />
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
