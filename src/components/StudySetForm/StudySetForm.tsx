import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { addStudySet, editStudySetSummary } from '../../state/studySet/studySetsSlice'
import { editTerms, fetchTerms } from '../../state/studySet/termsSlice'
import { TermItem, StudySet } from '../../common/types'
import { TermsForm } from './TermsForm'
import { useNavigate, useParams } from 'react-router-dom'
import { ROUTES } from '../../app/routes'
import { useAppSelector } from '../../app/hooks'
import { useDispatch } from 'react-redux'
import './studySetForm.scss'

export const StudySetForm = ({
  existingStudySet,
  termsInCurrentStudySet,
}: {
  existingStudySet?: StudySet
  termsInCurrentStudySet?: TermItem[]
}) => {
  const studySetId = existingStudySet?.studySetId
  const [isEditingMode, setEditingMode] = useState(!!studySetId)
  const user = useAppSelector((state) => state.auth.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const emptyTermField = { id: uuidv4(), term: '', definition: '', isFavorite: false }

  const [title, setTitle] = useState(existingStudySet ? existingStudySet.summary.title : '')
  const [description, setDescription] = useState(existingStudySet ? existingStudySet.summary.description : '')
  const [flashCardFields, setFlashCardFields] = useState<TermItem[]>(
    termsInCurrentStudySet ? termsInCurrentStudySet : [emptyTermField]
  )

  // todo: improve form ux, validation, state etc
  const [message, setMessage] = useState('')

  const addCardInputs = (e: any) => {
    e.preventDefault()
    setFlashCardFields(
      flashCardFields.concat({
        id: uuidv4(),
        term: '',
        definition: '',
        isFavorite: false,
      })
    )
    if (flashCardFields.length >= 1) {
      setMessage('')
    }
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
    if (existingStudySet) {
      handleUpdateStudySetSummary()
      handleUpdateTerms()
      navigate(`/${ROUTES.studySet}/${studySetId}`)
    } else {
      handleAddNewStudySet()
    }
  }

  const handleAddNewStudySet = () => {
    const studySetId = uuidv4()
    const newStudySet = {
      studySetId,
      summary: {
        title,
        description,
        numberOfItems: flashCardFields.length,
        creator: user && user.uid,
        termsId: uuidv4(),
      },
    }

    dispatch(addStudySet({ studySet: newStudySet, terms: flashCardFields }))
    navigate(`/${ROUTES.studySet}/${studySetId}`)
  }

  const handleUpdateStudySetSummary = () => {
    const updatedStudySet = {
      studySetId: existingStudySet!.studySetId,
      summary: {
        termsId: existingStudySet!.summary.termsId,
        numberOfItems: existingStudySet!.summary.numberOfItems,
        title: title,
        description: description,
      },
    }

    dispatch(editStudySetSummary(updatedStudySet))
  }

  const handleUpdateTerms = () => {
    dispatch(
      editTerms({
        termsId: existingStudySet?.summary.termsId,
        termsToUpdate: flashCardFields,
      })
    )
  }

  const handleDeleteCardInput = (id: string) => {
    const updatedFlashCardFields = flashCardFields.filter((item) => item.id !== id)
    if (updatedFlashCardFields.length < 1) {
      setMessage('Study set must have at least one item!')
    } else {
      setFlashCardFields(updatedFlashCardFields)
    }
  }

  return (
    <>
      <form className="study-set-form" onSubmit={(e) => handleSubmit(e)}>
        <h4>Title and description</h4>
        <div className="study-set-form__summary">
          <input
            type="text"
            name="title"
            id="collection-title"
            placeholder="title"
            value={title}
            autoComplete="off"
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            name="description"
            id="collection-description"
            placeholder="description"
            value={description}
            autoComplete="off"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {title && (
          <TermsForm
            flashCardsFields={flashCardFields}
            addNewField={addCardInputs}
            updateField={updateField}
            onDelete={handleDeleteCardInput}
          />
        )}
        {message && <span className="study-set-form__message">{message}</span>}
      </form>
    </>
  )
}
