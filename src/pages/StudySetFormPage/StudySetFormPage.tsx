import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import { StudySet } from '../../common/types'
import { StudySetForm } from '../../components/StudySetForm/StudySetForm'
import { fetchTerms } from '../../state/studySet/termsSlice'
import { Terms } from '../../state/types'

export const StudySetFormPage = () => {
  let { studySetId } = useParams()
  const isLoading = useAppSelector((state) => state.collections.isLoading)
  const termsLoading = useAppSelector((state) => state.termsData.isLoading)

  const existingStudySet = useAppSelector((state) =>
    state.collections.studySets.find((studySet: StudySet) => studySet.studySetId === studySetId)
  )

  const termsInCurrentStudySet = useAppSelector(
    (state) =>
      state.termsData.terms.find((termsData: Terms) => termsData.termsId === existingStudySet?.summary.termsId)
        ?.termItems
  )

  const dispatch = useDispatch()

  useEffect(() => {
    if (!termsLoading && !termsInCurrentStudySet) {
      existingStudySet && dispatch(fetchTerms(existingStudySet.summary.termsId))
    }
  }, [termsInCurrentStudySet, studySetId])

  return (
    <section>
      {termsLoading || isLoading ? (
        <div>loading...</div>
      ) : (
        <>
          <div className="section__title">
            <h1>{existingStudySet ? 'Edit study set' : 'New study set'}</h1>
          </div>
          <div className="content">
            <StudySetForm existingStudySet={existingStudySet} termsInCurrentStudySet={termsInCurrentStudySet} />
          </div>
        </>
      )}
    </section>
  )
}
