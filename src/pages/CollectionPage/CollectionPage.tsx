import { Link } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import { ROUTES } from '../../app/routes'
import { StudySet } from '../../common/types'
import { StudySetCard } from '../../components/StudySetCard/StudySetCard'
import './collectionPage.scss'

export const CollectionPage = () => {
  const studySets = useAppSelector((state) => state.collections.studySets)
  return (
    <section id="collection-page">
      <div className="section__title">
        <h1>Your collection</h1>
      </div>
      <div className="content">
        <div className="content__center">
          {studySets.length > 0 ? (
            studySets.map((studySet: StudySet) => (
              <StudySetCard key={studySet.studySetId} studySet={studySet} displayAsLink={true} />
            ))
          ) : (
            <div>
              <h2>No study sets yet!</h2>{' '}
              <Link to={`/${ROUTES.newStudySet}`}>
                <button>Create study set</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
