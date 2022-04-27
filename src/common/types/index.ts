export interface TermItem {
  id: string;
  term: string;
  definition: string;
  isFavorite: boolean;
}

export interface StudySetSummary {
  title: string;
  description: string;
  numberOfItems: number;
  termsId: string;
}

export type StudySet = {
  studySetId: string;
  summary: StudySetSummary;
};
