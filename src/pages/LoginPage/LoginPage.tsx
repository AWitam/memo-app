import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import { ROUTES } from '../../app/routes'
import './loginPage.scss'
import {
  loginWithEmail,
  passwordReset,
  signInWithGoogle,
  singUpWithEmail,
} from '../../state/user/userSlice'
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
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const isAuthorized = useAppSelector(
    (state) => state.auth.authState.isAuthorized
  )
  const navigate = useNavigate()
  const dispatch = useDispatch()

  //todo : better inputs validation (maybe while typing), error handling

  const handleAction = async (e: any, action: AuthActions) => {
    e.preventDefault()

    switch (action) {
      case AuthActions.googleSignIn:
        dispatch(signInWithGoogle())
        break
      case AuthActions.emailSignUp:
        dispatch(singUpWithEmail({ email, password }))
        break
      case AuthActions.emailLogin:
        dispatch(loginWithEmail({ email, password }))
        break
      case AuthActions.forgotPassword:
        dispatch(passwordReset({ email }))
        break

      default:
        break
    }
  }

  useEffect(() => {
    if (isAuthorized) {
      navigate(ROUTES.root)
    }
  }, [isAuthorized])

  /*  todo:
   different logic for sign up and login in?
   implement rest of auth: different signup methods, password reset
   */

  return (
    <section>
      <div className="content">
        {renderTitle(pageType)}
        <form>
          <div className="form__body">
            <div className="form__email">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form__password">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form__buttons">
              {renderButtons(pageType, handleAction)}
            </div>
          </div>
        </form>

        <div className="content__social-login">
          {renderSocialLogin(pageType, handleAction)}
        </div>
      </div>
    </section>
  )
}

const renderTitle = (pageType: string) => (
  <h2>{pageType == ROUTES.logIn ? 'Log in to MEMO' : 'Sign up to MEMO'}</h2>
)

const renderButtons = (
  pageType: string,
  handleAction: (e: any, action: AuthActions) => void
) => {
  return (
    <>
      {pageType === ROUTES.logIn && (
        <>
          <Button
            type={ButtonType.secondary}
            onClick={(e) => handleAction(e, AuthActions.emailLogin)}
          >
            Login
          </Button>
          <Button onClick={(e) => handleAction(e, AuthActions.forgotPassword)}>
            <a className="action__link">I forgot my password</a>
          </Button>
        </>
      )}
      {pageType === ROUTES.signUp && (
        <Button
          type={ButtonType.secondary}
          onClick={(e) => handleAction(e, AuthActions.emailSignUp)}
        >
          Sign up
        </Button>
      )}
    </>
  )
}

const renderSocialLogin = (
  pageType: string,
  handleAction: (e: any, auth: AuthActions) => void
) => {
  return (
    <>
      <p>
        {pageType == ROUTES.logIn ? 'Or log in using:' : 'Or sign up using:'}
      </p>

      <Button>
        <IconGoogle
          className="social-icon"
          onClick={(e) => handleAction(e, AuthActions.googleSignIn)}
        />
      </Button>
    </>
  )
}
