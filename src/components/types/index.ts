import { FlashCardField } from '../../common/types'

export interface WordFormProps {
  flashCardsFields: FlashCardField[]
  addNewField: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  updateField: (id: string, term: string, definition: string) => void
}

export interface InputGroupProps {
  field: FlashCardField
  updateField: (id: string, term: string, definition: string) => void
}
