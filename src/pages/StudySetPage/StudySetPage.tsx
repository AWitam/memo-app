import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import { TermItem, StudySet } from '../../common/types'
import { fetchTerms } from '../../state/studySet/termsSlice'
import { ReactComponent as RightArrowIcon } from '../../assets/icons/short-right.svg'
import { ReactComponent as StarIcon } from '../../assets/icons/star-outline.svg'
import './studySetPage.scss'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../app/routes'
import { StudySetCard } from '../../components/StudySetCard/StudySetCard'
import { Terms } from '../../state/types'

export const StudySetPage = () => {
  let { studySetId } = useParams()
  const isLoading = useAppSelector((state) => state.collections.isLoading)
  const termsLoading = useAppSelector((state) => state.termsData.isLoading)
  const currentStudySet = useAppSelector((state) =>
    state.collections.studySets.find(
      (studySet: StudySet) => studySet.studySetId === studySetId
    )
  )
  const termsInCurrentStudySet = useAppSelector(
    (state) =>
      state.termsData.terms.find(
        (termsData: Terms) =>
          termsData.termsId === currentStudySet?.summary.termsId
      )?.termItems
  )

  const dispatch = useDispatch()

  useEffect(() => {
    if (!isLoading && !termsInCurrentStudySet) {
      currentStudySet && dispatch(fetchTerms(currentStudySet.summary.termsId))
    }
  }, [termsInCurrentStudySet])

  return (
    <section id="study-set-page">
      <div className="section__title">
        <h1>Study set overview</h1>
      </div>
      <div className="section__study-set-overview">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          currentStudySet && <StudySetCard studySet={currentStudySet} />
        )}
      </div>
      {renderStudyModes()}
      <div className="section__article">
        <h3>Terms in this set:</h3>
        <div className="terms__container">
          {isLoading || !termsInCurrentStudySet
            ? 'loading'
            : renderStudySetTerms(termsInCurrentStudySet)}
        </div>
      </div>
    </section>
  )
}

const renderStudyModes = () => {
  return (
    <div className="section__sidebar">
      <h3>Choose study mode:</h3>
      <ul className="study-mode__list">
        <li className="study-mode__list--item">
          <Link to={ROUTES.flashcardMode}>
            <RightArrowIcon />
            Flashcards
          </Link>
        </li>
        <li className="study-mode__list--item">
          <Link to={ROUTES.quizMode}>
            <RightArrowIcon />
            Quiz
          </Link>
        </li>
      </ul>
    </div>
  )
}

const renderStudySetTerms = (terms: TermItem[]) => {
  return (
    <>
      {terms.map((item: TermItem) => (
        <div className="terms__item" key={item.id}>
          <div>
            <div className="terms__item--term">{item.term}</div>
            <div className="terms__item--definition">{item.definition}</div>
          </div>
          <div>
            <StarIcon />
          </div>
        </div>
      ))}
    </>
  )
}
