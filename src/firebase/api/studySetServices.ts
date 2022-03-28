import { collection, deleteDoc, doc, DocumentData, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore'
import { firebaseValue } from '..'
import { StudySet, TermItem } from '../../common/types'

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

interface TermInfo {
  [key: string]: {
    term: string
    definition: string
    isFavorite: boolean
  }
}

type TermMap = TermInfo & { studySetId: string }

export const addStudySet = async (studySet: StudySet, terms: TermItem[]) => {
  const { studySetId, summary } = studySet
  const studySetRef = doc(firebaseValue.db, `studySets/${studySetId}`)
  const termsRef = doc(firebaseValue.db, 'terms', summary.termsId)
  const termsMap = { studySetId: studySetId } as TermMap

  terms.forEach((item) => {
    termsMap[item.id] = { term: item.term, definition: item.definition, isFavorite: false }
  })

  Promise.all([setDoc(studySetRef, summary), setDoc(termsRef, termsMap)])
}

export const editStudySetSummary = async (studySet: StudySet) => {
  const { studySetId, summary } = studySet
  const studySetRef = doc(firebaseValue.db, 'studySets', studySetId)

  await updateDoc(studySetRef, {
    title: summary.title,
    description: summary.description,
  })
}

export const deleteStudySet = async (studySetId: string, termsId: string) => {
  const termsRef = doc(firebaseValue.db, 'terms', termsId)
  const studySetRef = doc(firebaseValue.db, 'studySets', studySetId)

  Promise.all([deleteDoc(termsRef), deleteDoc(studySetRef)])
}
