import { Button, ButtonType } from '../Button/Button'
import { TermsFormProp } from '../types'
import { InputGroup } from './InputGroup'

export const TermsForm = ({ flashCardsFields, addNewField, updateField, onDelete }: TermsFormProp) => {
  return (
    <div className="study-set-form__items">
      <h4>Add Terms and definitions</h4>
      {flashCardsFields.map((field, i) => (
        <InputGroup key={field.id} field={field} updateField={updateField} onDelete={onDelete} count={i} />
      ))}
      <div className="study-set-form__buttons">
        <Button type={ButtonType.secondary} onClick={(e) => addNewField(e)}>
          + add card
        </Button>
        <Button disabled={flashCardsFields.length < 1} type={ButtonType.primary}>
          Save and continue
        </Button>
      </div>
    </div>
  )
}
