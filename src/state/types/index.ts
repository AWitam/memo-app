import { StudySet } from '../../common/types'

export interface StudySetsState {
  studySets: Array<StudySet>
  isLoading: boolean
}

export type UserStudySetPayload = {
  userId: string
}

export type StudySetItemPayload = {
  userId: string
}
