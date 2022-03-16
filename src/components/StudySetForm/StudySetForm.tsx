import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { addStudySet, editStudySet, fetchStudySetData } from '../../state/studySet/studySetsSlice'

import { FlashCardField, StudySet } from '../../common/types'
import { WordsForm } from './WordsForm'
import { useNavigate, useParams } from 'react-router-dom'
import { ROUTES } from '../../app/routes'

import { useAppSelector } from '../../app/hooks'
import { useDispatch } from 'react-redux'

export const StudySetForm = () => {
  let { studySetId } = useParams()
  const isLoading = useAppSelector((state) => state.collections.isLoading)
  const user = useAppSelector((state) => state.auth.user)

  const existingStudySet = useAppSelector((state) =>
    state.collections.studySets.find((studySet: StudySet) => studySet.studySetId === studySetId)
  )

  const [isEditingMode, setEditingMode] = useState(false)

  const dispatch = useDispatch()

  const navigate = useNavigate()

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

  useEffect(() => {
    if (existingStudySet) {
      setEditingMode(true)
      setTitle(existingStudySet.summary.title)
      setDescription(existingStudySet.summary.description)
      if (!existingStudySet?.terms) {
        studySetId && dispatch(fetchStudySetData(existingStudySet.summary.termsId))
      }
      if (existingStudySet.terms) {
        setFlashCardFields(existingStudySet.terms)
      }
    }
  }, [existingStudySet, isLoading])

  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (existingStudySet) {
      handleUpdateStudySet()
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
      terms: flashCardFields,
    }

    dispatch(addStudySet(newStudySet))
    navigate(`/${ROUTES.studySet}/${studySetId}`)
  }

  const handleUpdateStudySet = () => {
    if (existingStudySet) {
      const updatedStudySet = {
        ...existingStudySet,
        summary: {
          ...existingStudySet.summary,
          numberOfItems: flashCardFields.length,
        },
        terms: flashCardFields,
      }
      dispatch(editStudySet(updatedStudySet))
      navigate(`/${ROUTES.studySet}/${studySetId}`)
    }
  }

  return (
    <div>
      {isLoading ? (
        'loading ...'
      ) : (
        <>
          <h1>{isEditingMode ? 'Edit study set' : 'Create new study set!'}</h1>
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
            {title && <WordsForm flashCardsFields={flashCardFields} addNewField={addCardInputs} updateField={updateField} />}
          </form>
        </>
      )}
    </div>
  )
}
