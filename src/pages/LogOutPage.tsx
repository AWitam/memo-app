import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { logOut } from '../state/user/userSlice'

export const LogOutPage = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(logOut())
  }, [])

  return <div>Log out</div>
}
