import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import { StudySet } from '../../common/types'
import { useFirebase } from '../../firebase/firebaseContextProvider'
import { fetchStudySetData } from '../../state/studySet/studySetsSlice'

export const StudySetPage = () => {
  let { studySetId } = useParams()
  const isLoading = useAppSelector((state) => state.collections.isLoading)
  const currentStudySet = useAppSelector((state) =>
    state.collections.studySets.find((studySet: StudySet) => studySet.studySetId === studySetId)
  )
  const { dispatch } = useFirebase()

  useEffect(() => {
    if (!isLoading && !currentStudySet?.terms) {
      currentStudySet && dispatch(fetchStudySetData(currentStudySet.summary.termsId))
    }
  }, [isLoading])

  return (
    <div>
      StudySet - practice
      <div>
        {isLoading || !currentStudySet?.terms ? (
          'loading'
        ) : (
          <div>
            <h2>{currentStudySet.summary.title}</h2>
            {currentStudySet.terms.map((item: any) => (
              <div key={item.id}>
                {item.term} - {item.definition}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
