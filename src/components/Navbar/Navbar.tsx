import { NavLink, Outlet } from 'react-router-dom'
import { ROUTES } from '../../app/routes'

export const Navbar = ({ loggedMode }: any) => {
  return (
    <>
      <nav style={{ display: 'flex', maxWidth: '100%', justifyContent: 'space-between', margin: '2rem' }}>
        <div>
          <NavLink to={ROUTES.root}>Home</NavLink>
          {loggedMode && <NavLink to={ROUTES.collection}>Collection</NavLink>}
          <NavLink to={ROUTES.newStudySet}>New Study Set</NavLink>
        </div>
        <div>
          {loggedMode ? (
            <>
              <NavLink to={ROUTES.logOut}>Log out</NavLink>
            </>
          ) : (
            <>
              <NavLink to={ROUTES.logIn}>Log in</NavLink>
              <NavLink to={ROUTES.signUp}>Sign up</NavLink>
            </>
          )}
        </div>
      </nav>
      <Outlet />
    </>
  )
}
