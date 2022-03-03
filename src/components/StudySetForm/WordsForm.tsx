import { WordFormProps } from '../types'
import { InputGroup } from './InputGroup'

export const WordsForm: React.FC<WordFormProps> = ({ flashCardsFields, addNewField, ...props }) => {
  return (
    <>
      <h2>Add words and definitions</h2>
      {flashCardsFields.map((field) => (
        <InputGroup key={field.id} field={field} updateField={props.updateField} />
      ))}
      <div>
        <button onClick={(e) => addNewField(e)}>Add new word</button>
        <button>Save and continue</button>
      </div>
    </>
  )
}
