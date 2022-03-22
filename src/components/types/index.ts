import { TermItem } from '../../common/types'

export interface WordFormProps {
  flashCardsFields: TermItem[]
  addNewField: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  updateField: (id: string, term: string, definition: string) => void
}

export interface InputGroupProps {
  field: TermItem
  updateField: (id: string, term: string, definition: string) => void
}
