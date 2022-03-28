import { useEffect, useState } from 'react'
import { Link, NavLink, To, useLocation } from 'react-router-dom'
import { ROUTES } from '../../app/routes'
import { Button, ButtonType } from '../Button/Button'
import { ReactComponent as IconMenu } from '../../assets/icons/hamburger.svg'
import { ReactComponent as CloseIcon } from '../../assets/icons/close_big.svg'
import './navbar.scss'

export const Navbar = ({ loggedMode }: { loggedMode: boolean }) => {
  const location = useLocation()
  const [isOpen, setOpen] = useState(false)
  const [isMobile, setMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    setOpen(false)
    const changeWidth = () => {
      setMobile(window.innerWidth < 768)
    }

    window.addEventListener('resize', changeWidth)

    return () => {
      window.removeEventListener('resize', changeWidth)
    }
  }, [location, isMobile])

  return (
    <>
      <header>
        <div className="container">
          <nav>
            <div className="nav__wrapper">
              <Link to={`${ROUTES.root}`}>
                <span id="logo">MEMO</span>
              </Link>

              {isMobile ? (
                <div className="nav__links-right">
                  {!loggedMode && (
                    <NavItem to={ROUTES.signUp} content={<Button type={ButtonType.primary}>Sign up</Button>}></NavItem>
                  )}

                  <button onClick={() => setOpen(!isOpen)}>{isOpen ? <CloseIcon /> : <IconMenu />} </button>
                </div>
              ) : (
                <ul className={`nav__links`}>
                  <NavLinks loggedMode={loggedMode} />
                </ul>
              )}
            </div>
            {isOpen && (
              <ul className={`nav__links${isOpen && '--open'}`}>
                <NavLinks loggedMode={loggedMode} isMobile={isMobile} />
              </ul>
            )}
          </nav>
        </div>
      </header>
    </>
  )
}

const NavLinks = ({ loggedMode, isMobile }: { loggedMode: boolean; isMobile?: boolean }) => (
  <>
    <div className="nav__links-left">
      <NavItem to={loggedMode ? ROUTES.root : ROUTES.landing} content="Home" />
      {loggedMode && <NavItem to={ROUTES.collection} content="Collection" />}
      <NavItem to={ROUTES.newStudySet} content={<Button type={ButtonType.secondary}>New Study Set</Button>}></NavItem>
    </div>
    <div className="nav__links-right">
      {loggedMode ? (
        <Button>
          <NavLink to={ROUTES.logOut}>Log out</NavLink>
        </Button>
      ) : (
        <>
          <NavItem to={ROUTES.logIn} content={<Button>Log in</Button>}></NavItem>
          {!isMobile && (
            <NavItem to={ROUTES.signUp} content={<Button type={ButtonType.primary}>Sign up</Button>}></NavItem>
          )}
        </>
      )}
    </div>
  </>
)

const NavItem = ({ to, content }: { to: To; content: string | JSX.Element }) => (
  <li className="nav__links-item">
    <NavLink to={to}>{content}</NavLink>
  </li>
)
