export interface FlashCardField {
  id: string
  term: string
  definition: string
}

export interface StudySetSummary {
  title: string
  description: string
  numberOfItems?: number
}

export interface StudySet {
  studySetId: string
  summary: StudySetSummary
  terms?: Array<FlashCardField>
}
