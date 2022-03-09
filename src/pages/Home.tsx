import { useAppSelector } from '../app/hooks'
import { Link } from 'react-router-dom'
import { ROUTES } from '../app/routes'
import { Collection } from './Collection'

export const Home = () => {
  const studySets = useAppSelector((state) => state.collections.studySets)
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
