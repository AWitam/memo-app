import { useNavigate, useParams } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import { ROUTES } from '../../app/routes'
import { FlashCardField, StudySet } from '../../common/types'
import { FlashCardsSlider } from '../../components/FlashcardsSlider/FlashCardsSlider'
import { capitalize } from '../../utils/capitalize'

export const StudyModePage = ({ mode }: { mode: string }) => {
  const { studySetId } = useParams()
  const isLoading = useAppSelector((state) => state.collections.isLoading)
  const currentStudySet = useAppSelector((state) =>
    state.collections.studySets.find(
      (studySet: StudySet) => studySet.studySetId === studySetId
    )
  )
  const navigate = useNavigate()

  const redirectOnFinish = () => navigate(`/${ROUTES.studySet}/${studySetId}`)

  return (
    <section>
      {isLoading && <div>Loading...</div>}
      {!isLoading && (
        <div className="section__title">
          <h1>{currentStudySet?.summary.title}</h1>
          <h3>{capitalize(mode)}</h3>
        </div>
      )}
      <div className="content">
        {currentStudySet?.terms && mode === 'flashcards' && (
          <FlashCardsSlider
            terms={currentStudySet.terms}
            finish={redirectOnFinish}
          />
        )}
      </div>
    </section>
  )
}
