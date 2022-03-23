import { collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { firebaseValue } from '..'
import { TermItem } from '../../common/types'

export const getStudySetTerms = async (termsId: string) => {
  try {
    const docRef = doc(firebaseValue.db, 'terms', termsId)
    const termsData = await getDoc(docRef)
    return termsData.data()
  } catch (error) {
    console.log(error)
  }
}

export const toggleFavorite = async (termsId: string, termId: string, value: boolean) => {
  const termsDoc = doc(firebaseValue.db, 'terms', termsId)
  const querySnapshot = await getDoc(termsDoc)
  const allItems = querySnapshot.ref

  await updateDoc(allItems, {
    [`${termId}.isFavorite`]: value,
  })
}

export const editStudySetTerms = async (termsId: string, terms: TermItem[]) => {
  const termsDocRef = doc(firebaseValue.db, 'terms', termsId)
  const studySetsRef = collection(firebaseValue.db, 'studySets')

  const q = query(studySetsRef, where('termsId', '==', termsId))
  const querySnapshot = await getDocs(q)
  const studySetDocRef = querySnapshot.docs[0].ref

  const preparedItems: any = {}
  terms.forEach((item) => {
    preparedItems[item.id] = { term: item.term, definition: item.definition, isFavorite: false }
  })

  const updateTerms = updateDoc(termsDocRef, preparedItems)

  const updateTermsCount = updateDoc(studySetDocRef, {
    numberOfItems: terms.length,
  })

  Promise.all([updateTerms, updateTermsCount])
}
