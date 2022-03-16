import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'
import { ROUTES } from '../app/routes'

import { signInWithGoogle } from '../state/user/userSlice'

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

  //todo different logic for sign up and login in?

  return (
    <div>
      <button onClick={handleAction}>Log in with google</button>
    </div>
  )
}
