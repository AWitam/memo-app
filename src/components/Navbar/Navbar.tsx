import React from 'react'
import { NavLink } from 'react-router-dom'
import ROUTES from '../../app/routes'

export const Navbar = () => {
  return (
    <nav>
      <ul>
        <NavLink to="/">Home</NavLink>
        <NavLink to={ROUTES.collectionRoute}>Collection</NavLink>
        <NavLink to={ROUTES.newStudySetRoute}>New Study Set</NavLink>
      </ul>
    </nav>
  )
}
