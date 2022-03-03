import { useState } from 'react'
import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux'
import { RootState } from '../../app/store'
import { v4 as uuidv4 } from 'uuid'
import { selectStudySets, addStudySet } from '../../state/studySetForm/studySetsSlice'

import { FlashCardField } from '../../common/types'
import { WordsForm } from './WordsForm'

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector

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
