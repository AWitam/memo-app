import GlobalStyle from '../theme/GlobalStyles'
import { Navbar } from '../components/Navbar/Navbar'
import { useAppSelector } from './hooks'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { verifyAuth } from '../state/user/userSlice'

function App({ children }: any) {
  const user = useAppSelector((state) => state.auth.user)
  const [loggedNavbarMode, setNavbarMode] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(verifyAuth())
  }, [])

  useEffect(() => {
    setNavbarMode(!!user)
  }, [user])

  return (
    <>
      <GlobalStyle />
      <Navbar loggedMode={loggedNavbarMode} />
      <main className="container">
        <Outlet />
        {children}
      </main>
    </>
  )
}

export default App
