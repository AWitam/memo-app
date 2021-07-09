import React from 'react'
import { Link } from 'react-router-dom'
import ROUTES from '../app/routes'

const Collection = () => {
  return (
    <div>
      <h2>No study sets yet!</h2>
      <Link to={ROUTES.newStudySetRoute}>
        <button>Create study set</button>
      </Link>
    </div>
  )
}

export default Collection
