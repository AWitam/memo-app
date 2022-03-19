import { useAppSelector } from '../../app/hooks'
import { StudySet } from '../../common/types'
import { StudySetCard } from '../../components/StudySetCard/StudySetCard'
import './collectionPage.scss'

export const CollectionPage = () => {
  const studySets = useAppSelector((state) => state.collections.studySets)
  return (
    <section>
      <div className="section__title">
        <h1>Your collection</h1>
      </div>
      <div className="content">
        <div className="content__center">
          {studySets.map((studySet: StudySet) => (
            <StudySetCard key={studySet.studySetId} studySet={studySet} />
          ))}
        </div>
      </div>
    </section>
  )
}
