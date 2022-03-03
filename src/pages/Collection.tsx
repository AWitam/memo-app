import { useAppSelector } from '../app/hooks'
import { useFirebase } from '../firebase/firebaseContextProvider'
import { collection, getDocs } from '@firebase/firestore'
import { fetchStudySetsItems } from '../state/studySetForm/studySetsSlice'
import { Link } from 'react-router-dom'
import { ROUTES } from '../app/routes'

// displays study sets summaries

export const Collection = () => {
  const studySets = useAppSelector((state) => state.collections.studySets)
  const {
    firebaseValue: { app, db },
    dispatch,
  } = useFirebase()

  const getTermsFormat = (numberOfItems: number | undefined): string => {
    switch (numberOfItems) {
      case 0 || null || undefined:
        return `There's no terms in this study set. Create one!`
      case 1:
        return `${numberOfItems} term`
      default:
        return `${numberOfItems} terms`
    }
  }

  const getStudySetItems = async (studySetId: string) => {
    console.log(studySetId)
    try {
      const studySetsItemsRef = collection(db, `studySets/${studySetId}/terms`)
      const data = await getDocs(studySetsItemsRef)
      data.forEach((doc) => console.log(doc.data(), doc.id))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h2>Your collection</h2>
      {studySets.map((studySet) => (
        <div
          key={studySet.summary.title}
          style={{ border: `1px solid #333`, padding: '20px', margin: '20px', maxWidth: '300px' }}
        >
          <h2>{studySet.summary.title}</h2>
          <div>{getTermsFormat(studySet.summary.numberOfItems)}</div>
          <Link to={ROUTES.studySet}>
            <button style={{ margin: '10px' }} onClick={() => getStudySetItems(studySet.id)}>
              Practice
            </button>
          </Link>
        </div>
      ))}
    </div>
  )
}
