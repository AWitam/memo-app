import { useAppSelector } from '../app/hooks'
import { Link, useNavigate } from 'react-router-dom'
import { ROUTES } from '../app/routes'
import { StudySet } from '../common/types'
import { useEffect, useRef, useState } from 'react'
import { deleteStudySetThunk } from '../state/studySet/studySetsSlice'
import { useDispatch } from 'react-redux'

export const Collection = () => {
  const studySets = useAppSelector((state) => state.collections.studySets)
  return (
    <div>
      <h2>Your collection</h2>
      {studySets.map((studySet: StudySet) => (
        <StudySetCard key={studySet.studySetId} studySet={studySet} />
      ))}
    </div>
  )
}

const StudySetCard = ({ studySet }: { studySet: StudySet }) => {
  const { summary, studySetId } = studySet
  const [isOpen, setOpen] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleDelete = (studySetId: string, termsId: string) => {
    dispatch(deleteStudySetThunk({ studySetId, termsId }))
  }

  return (
    <div key={summary.title} style={{ border: `1px solid #333`, padding: '20px', margin: '20px', maxWidth: '300px', position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h2>{summary.title}</h2>
        <button style={{ background: 'none', border: 'none' }} onClick={() => setOpen(!isOpen)}>
          <span style={{ fontSize: '20px' }}>&#8942;</span>{' '}
        </button>
      </div>
      {isOpen ? (
        <SettingsModal
          onDelete={() => handleDelete(studySetId, summary.termsId)}
          onEdit={() => navigate(`/${ROUTES.studySet}/${studySetId}/edit`)}
          toggleOpen={() => setOpen(!isOpen)}
        />
      ) : null}

      <div>{getTermsFormat(summary.numberOfItems)}</div>
      <Link to={`/${ROUTES.studySet}/${studySetId}`}>Practice</Link>
    </div>
  )
}

const SettingsModal = ({ toggleOpen, onDelete, onEdit }: any) => {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        event.target.tagName !== 'SPAN' && toggleOpen()
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [modalRef])

  return (
    <div
      ref={modalRef}
      style={{
        position: 'absolute',
        left: '80%',
        backgroundColor: '#FFF9F1',
        padding: '10px',
        border: '1px solid rgb(51, 51, 51)',
        width: '80px',
        cursor: 'pointer',
      }}
    >
      <span onClick={onDelete}>✖ delete</span>
      <span onClick={onEdit}>🖊 edit</span>
    </div>
  )
}

const getTermsFormat = (numberOfItems: number | undefined): string => {
  switch (numberOfItems) {
    case 0 || null || undefined:
      return `There's no terms in this study set. Create one!`
    case 1:
      return `${numberOfItems} term`
    default:
      return `${numberOfItems} terms`
  }
}
