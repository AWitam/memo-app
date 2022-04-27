import { TermItem } from '../../common/types';

export interface TermsFormProp {
  flashCardsFields: TermItem[];
  addNewField: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  updateField: (id: string, term: string, definition: string) => void;
  onDelete: (id: string) => void;
  message: string;
}

export interface InputGroupProps {
  field: TermItem;
  updateField: (id: string, term: string, definition: string) => void;
  onDelete: (id: string) => void;
  count: number;
}
