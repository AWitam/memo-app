import { collection, deleteDoc, doc, DocumentData, getDoc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore'
import { firebaseValue } from '..'
import { StudySet } from '../../common/types'

export const getStudySetData = async (termsId: string) => {
  try {
    const docRef = doc(firebaseValue.db, 'terms', termsId)
    const termsData = await getDoc(docRef)
    return termsData.data()
  } catch (error) {
    console.log(error)
  }
}

export const fetchUserStudySets = async (userId: string) => {
  const studySetsRef = collection(firebaseValue.db, 'studySets')
  const q = query(studySetsRef, where('creator', '==', userId))
  const querySnapshot = await getDocs(q)
  const userStudySetsData: Array<DocumentData> = []

  querySnapshot.forEach((doc) => {
    userStudySetsData.push({ studySetId: doc.id, summary: doc.data() })
  })

  return userStudySetsData
}

export const addStudySet = async (studySet: StudySet) => {
  const { studySetId, summary, terms } = studySet
  const studySetRef = doc(firebaseValue.db, `studySets/${studySetId}`)
  const termsRef = doc(firebaseValue.db, 'terms', summary.termsId)

  Promise.all([setDoc(studySetRef, summary), setDoc(termsRef, { terms: terms })])
}

export const editStudySetSummary = async (studySet: StudySet) => {
  const { studySetId, summary } = studySet
  const studySetRef = doc(firebaseValue.db, 'studySets', studySetId)

  await updateDoc(studySetRef, {
    title: summary.title,
    description: summary.description,
  })
}

export const editStudySetTerms = async (studySet: StudySet) => {
  const { studySetId, summary, terms } = studySet
  const termsDocRef = doc(firebaseValue.db, 'terms', summary.termsId)
  const studySetRef = doc(firebaseValue.db, 'studySets', studySetId)

  const updateTerms = updateDoc(termsDocRef, {
    terms: terms,
  })

  const updateTermsCount = updateDoc(studySetRef, {
    numberOfItems: summary.numberOfItems,
  })

  Promise.all([updateTerms, updateTermsCount])
}

export const deleteStudySet = async (studySetId: string, termsId: string) => {
  const termsRef = doc(firebaseValue.db, 'terms', termsId)
  const studySetRef = doc(firebaseValue.db, 'studySets', studySetId)

  Promise.all([deleteDoc(termsRef), deleteDoc(studySetRef)])
}
