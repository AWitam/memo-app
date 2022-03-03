import { DocumentData, Query } from 'firebase/firestore'

export interface StudySetsState {
  studySets: DocumentData
  isLoading: boolean
}

export type UserStudySetPayload = {
  userId: string
  studySetsRef: Query
}

export type StudySetItemPayload = {
  userId: string
  studySetsItemsRef: Query
}
