import { addDoc, collection, doc, DocumentData, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore'
import { firebaseValue } from '.'
import { StudySet } from '../common/types'

export const getStudySetData = async (studySetId: string) => {
  try {
    const termsRef = collection(firebaseValue.db, `studySets/${studySetId}/terms`)
    const docs = await getDocs(termsRef)
    const studySetData: Array<DocumentData> = []
    docs.forEach((doc) => studySetData.push({ studySetId, terms: doc.data().items }))

    return studySetData[0]
  } catch (error) {
    return []
  }
}

export const fetchUserStudySets = async (userId: string) => {
  const studySetsRef = collection(firebaseValue.db, 'studySets')
  const q = query(studySetsRef, where('creator', '==', userId))
  const querySnapshot = await getDocs(q)
  const userStudySetsData: Array<DocumentData> = []

  querySnapshot.forEach((doc) => {
    userStudySetsData.push({ id: doc.id, summary: doc.data() })
  })
  return userStudySetsData
}

export const addStudySet = async (studySet: any) => {
  const studySetRef = doc(firebaseValue.db, `studySets/${studySet.id}`)
  await setDoc(studySetRef, studySet.summary).then(async () => {
    const docRef = await addDoc(collection(firebaseValue.db, `studySets/${studySet.id}/terms`), {
      items: studySet.terms,
    })
  })
}
