import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link, Navigate, RoutesProps, useLocation, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import { ROUTES } from '../../app/routes'
import './loginPage.scss'
import { signInWithGoogle } from '../../state/user/userSlice'
import { Button, ButtonType } from '../../components/Button/Button'
import { ReactComponent as IconGoogle } from '../../assets/icons/icon-google.svg'

type LoginPageProps = {
  pageType: ROUTES.signUp | ROUTES.logIn
}

enum AuthActions {
  googleSignIn,
  emailLogin,
  emailSignUp,
  forgotPassword,
}

export const LoginPage = ({ pageType }: LoginPageProps) => {
  const user = useAppSelector((state) => state.auth.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleAction = async (action: AuthActions) => {
    switch (action) {
      case AuthActions.googleSignIn:
        dispatch(signInWithGoogle())
        break

      default:
        break
    }
  }

  useEffect(() => {
    if (user) {
      navigate(ROUTES.root)
    }
  }, [user])

  /*  todo:
   different logic for sign up and login in?
   implement rest of auth: different signup methods, password reset
   */

  return (
    <section>
      <div className="content">
        <div className="content__center">
          {renderTitle(pageType)}
          <form>
            <div className="form__body">
              <div className="form__email">
                <label htmlFor="email">Email</label>
                <input type="text" name="email" id="" />
              </div>
              <div className="form__password">
                <label htmlFor="password">Password</label>
                <input type="text" name="password" id="" />
              </div>
              <div className="form__buttons">{renderButtons(pageType, handleAction)}</div>
            </div>
          </form>

          <div className="content__social-login">{renderSocialLogin(pageType, handleAction)}</div>
        </div>
      </div>
    </section>
  )
}

const renderTitle = (pageType: string) => (
  <h2>{pageType == ROUTES.logIn ? 'Log in to MEMO' : 'Sign up to MEMO'}</h2>
)

const renderButtons = (pageType: string, handleAction: (action: AuthActions) => void) => {
  return (
    <>
      {pageType === ROUTES.logIn && (
        <>
          <Button type={ButtonType.secondary}>Login</Button>
          <Button>
            <Link to="/password-reset" className="action__link">
              I forgot my password
            </Link>
          </Button>
        </>
      )}
      {pageType === ROUTES.signUp && <Button type={ButtonType.secondary}>Sign up</Button>}
    </>
  )
}

const renderSocialLogin = (pageType: string, handleAction: (auth: AuthActions) => void) => {
  return (
    <>
      <p>{pageType == ROUTES.logIn ? 'Or log in using:' : 'Or sign up using:'}</p>

      <Button>
        <IconGoogle onClick={() => handleAction(AuthActions.googleSignIn)} />
      </Button>
    </>
  )
}
