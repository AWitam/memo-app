import React, { useContext, useEffect, useReducer, useState } from 'react'
import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux'
import { RootState } from '../../app/store'

import { v4 as uuidv4 } from 'uuid'
import { selectStudySets, addStudySet } from '../../state/studySetForm/studySetsSlice'

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector

export interface FlashCardField {
  id: string
  term: string
  definition: string
}

export const StudySetForm = () => {
  const createStudySetParams = useTypedSelector(selectStudySets)
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [flashCardFields, setFlashCardFields] = useState<FlashCardField[]>([{ id: uuidv4(), term: '', definition: '' }])

  const addCardInputs = (e: any) => {
    e.preventDefault()
    setFlashCardFields(flashCardFields.concat({ id: uuidv4(), term: '', definition: '' }))
  }

  const updateField = (id: string, term: string, definition: string) => {
    let fieldToUpdate = flashCardFields.findIndex((field) => field.id === id)

    let updatedFlashCardFields = [...flashCardFields]
    updatedFlashCardFields[fieldToUpdate] = {
      ...updatedFlashCardFields[fieldToUpdate],
      term: term,
      definition: definition,
    }

    setFlashCardFields(updatedFlashCardFields)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    const studySetId = uuidv4()
    dispatch(addStudySet({ id: studySetId, title, description, flashCardFields }))
    // api.addStudySet({ title, description, flashCardFields })
  }

  return (
    <div>
      <h1>Create new study set!</h1>

      <h2>Title and description</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          name="title"
          id="collection-title"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          name="description"
          id="collection-description"
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {title && (
          <WordsForm flashCardsFields={flashCardFields} addNewField={addCardInputs} updateField={updateField} />
        )}
      </form>
    </div>
  )
}

export interface FlashCardField {
  id: string
  term: string
  definition: string
}

interface WordFormProps {
  flashCardsFields: FlashCardField[]
  addNewField: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  updateField: (id: string, term: string, definition: string) => void
}

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

interface InputGroupProps {
  field: FlashCardField
  updateField: (id: string, term: string, definition: string) => void
}

export const InputGroup = ({ field, updateField }: InputGroupProps) => {
  const { id, term, definition } = field

  const [termValue, setTermValue] = useState(term)
  const [definitionValue, setDescriptionValue] = useState(definition)

  useEffect(() => {
    updateField(id, termValue, definitionValue)
  }, [termValue, definitionValue])

  return (
    <div>
      <input type="text" name="term" value={termValue} onChange={(e) => setTermValue(e.target.value)} />
      <input
        type="text"
        name="definition"
        value={definitionValue}
        onChange={(e) => setDescriptionValue(e.target.value)}
      />
    </div>
  )
}
