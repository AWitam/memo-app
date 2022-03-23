import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import {
  addStudySet,
  editStudySetSummary,
} from '../../state/studySet/studySetsSlice'
import { editTerms, fetchTerms } from '../../state/studySet/termsSlice'
import { TermItem, StudySet } from '../../common/types'
import { WordsForm } from './WordsForm'
import { useNavigate, useParams } from 'react-router-dom'
import { ROUTES } from '../../app/routes'
import { useAppSelector } from '../../app/hooks'
import { useDispatch } from 'react-redux'
import { Terms } from '../../state/types'

// TODO: ogarnac ten burdel

export const StudySetForm = () => {
  let { studySetId } = useParams()
  const isLoading = useAppSelector((state) => state.collections.isLoading)
  const termsLoading = useAppSelector((state) => state.termsData.isLoading)
  const user = useAppSelector((state) => state.auth.user)

  const existingStudySet = useAppSelector((state) =>
    state.collections.studySets.find(
      (studySet: StudySet) => studySet.studySetId === studySetId
    )
  )

  const termsInCurrentStudySet = useAppSelector(
    (state) =>
      state.termsData.terms.find(
        (termsData: Terms) =>
          termsData.termsId === existingStudySet?.summary.termsId
      )?.termItems
  )

  useEffect(() => {
    if (!termsLoading && !termsInCurrentStudySet) {
      existingStudySet && dispatch(fetchTerms(existingStudySet.summary.termsId))
    }
    if (termsInCurrentStudySet) {
      setFlashCardFields(termsInCurrentStudySet)
    }
  }, [termsInCurrentStudySet])

  const [isEditingMode, setEditingMode] = useState(false)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [flashCardFields, setFlashCardFields] = useState<TermItem[]>([
    { id: uuidv4(), term: '', definition: '', isFavorite: false },
  ])

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
      if (!termsInCurrentStudySet) {
        studySetId && dispatch(fetchTerms(existingStudySet.summary.termsId))
      } else {
        setFlashCardFields(termsInCurrentStudySet)
      }
    }
  }, [existingStudySet, isLoading])

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

  return (
    <div>
      {isLoading || termsLoading ? (
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
            {title && (
              <WordsForm
                flashCardsFields={flashCardFields}
                addNewField={addCardInputs}
                updateField={updateField}
              />
            )}
          </form>
        </>
      )}
    </div>
  )
}
