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
  id: string
  summary: StudySetSummary
  items?: Array<FlashCardField>
}
