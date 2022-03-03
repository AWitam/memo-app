import { NavLink, Outlet } from 'react-router-dom'
import { ROUTES } from '../../app/routes'

export const Navbar = () => {
  return (
    <>
      <nav>
        <ul>
          <NavLink to={ROUTES.root}>Home</NavLink>
          <NavLink to={ROUTES.collection}>Collection</NavLink>
          <NavLink to={ROUTES.newStudySet}>New Study Set</NavLink>
        </ul>
      </nav>
      <Outlet />
    </>
  )
}
