import { DocumentData, Query } from 'firebase/firestore'

export interface StudySetsState {
  studySets: DocumentData
  isLoading: boolean
}

export type UserStudySetPayload = {
  userId: string
}

export type StudySetItemPayload = {
  userId: string
}
