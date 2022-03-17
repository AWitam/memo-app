import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import { ROUTES } from '../../app/routes'
import './loginPage.scss'
import { signInWithGoogle } from '../../state/user/userSlice'
import { Button, ButtonType } from '../../components/Button/Button'
import { ReactComponent as IconGoogle } from '../../assets/icons/icon-google.svg'

export const LoginPage = () => {
  const dispatch = useDispatch()
  const user = useAppSelector((state) => state.auth.user)
  const navigate = useNavigate()

  const handleAction = async (e: any) => {
    dispatch(signInWithGoogle())
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
          <h2>Log in to MEMO</h2>
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
              <div className="form__buttons">
                <Button type={ButtonType.secondary}>Login</Button>
                <Button>
                  <Link to="/password-reset" className="action__link">
                    I forgot my password
                  </Link>
                </Button>
              </div>
            </div>
          </form>

          <div>
            <p>Or sign in using:</p>
            <div className=" content__social-login">
              <Button>
                <IconGoogle onClick={handleAction} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
