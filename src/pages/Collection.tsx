import { useAppSelector } from '../app/hooks'
import { Link, Outlet } from 'react-router-dom'
import { ROUTES } from '../app/routes'
import { StudySet } from '../common/types'

// displays study sets summaries

export const Collection = () => {
  const studySets = useAppSelector((state) => state.collections.studySets)

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

  return (
    <div>
      <h2>Your collection</h2>
      {studySets.map((studySet: any) => (
        <div
          key={studySet.summary.title}
          style={{ border: `1px solid #333`, padding: '20px', margin: '20px', maxWidth: '300px' }}
        >
          <h2>{studySet.summary.title}</h2>
          <div>{getTermsFormat(studySet.summary.numberOfItems)}</div>
          <Link to={`/${ROUTES.studySet}/${studySet.id}`}>Practice</Link>
        </div>
      ))}
    </div>
  )
}
