import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import { useFirebase } from '../../firebase/firebaseContextProvider'
import { fetchStudySetData } from '../../state/studySet/studySetsSlice'

export const StudySet = () => {
  let { studySetId } = useParams()
  const isLoading = useAppSelector((state) => state.collections.isLoading)
  const currentStudySet = useAppSelector((state) =>
    state.collections.studySets.find((studySet: any) => studySet.id === studySetId)
  )

  const { dispatch } = useFirebase()

  useEffect(() => {
    if (!isLoading && !currentStudySet.terms) {
      studySetId && dispatch(fetchStudySetData(studySetId))
    }
  }, [isLoading])

  return (
    <div>
      StudySet
      <div>
        {isLoading || !currentStudySet.terms ? (
          'loading'
        ) : (
          <div>
            {currentStudySet.terms.map((item: any) => (
              <div>
                {item.term} - {item.definition}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
