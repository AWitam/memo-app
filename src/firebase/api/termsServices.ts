import { collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { firebaseValue } from '..'
import { TermItem } from '../../common/types'

export const getStudySetTerms = async (termsId: string) => {
  try {
    const docRef = doc(firebaseValue.db, 'terms', termsId)
    const termsData = await getDoc(docRef)
    return termsData.data()?.terms
  } catch (error) {
    console.log(error)
  }
}

export const editStudySetTerms = async (termsId: string, terms: TermItem[]) => {
  const termsDocRef = doc(firebaseValue.db, 'terms', termsId)
  const studySetsRef = collection(firebaseValue.db, 'studySets')

  const q = query(studySetsRef, where('termsId', '==', termsId))
  const querySnapshot = await getDocs(q)
  const studySetDocRef = querySnapshot.docs[0].ref

  const updateTerms = updateDoc(termsDocRef, {
    terms: terms,
  })

  const updateTermsCount = updateDoc(studySetDocRef, {
    numberOfItems: terms.length,
  })

  Promise.all([updateTerms, updateTermsCount])
}
