export interface FlashCardField {
  id: string
  term: string
  definition: string
}

export interface StudySetSummary {
  title: string
  description: string
  numberOfItems: number
  termsId: string
}

export type StudySet = {
  studySetId: string
  terms?: Array<FlashCardField>
  summary: StudySetSummary
}
