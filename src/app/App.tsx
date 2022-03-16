import GlobalStyle from '../theme/GlobalStyles'
import { Navbar } from '../components/Navbar/Navbar'
import { useAppSelector } from './hooks'

import { useEffect, useState } from 'react'

function App({ children }: any) {
  const user = useAppSelector((state) => state.auth.user)
  const [loggedNavbarMode, setNavbarMode] = useState(false)
  useEffect(() => {
    if (user) {
      setNavbarMode(true)
    }
  }, [user])

  return (
    <>
      <GlobalStyle />
      <Navbar loggedMode={loggedNavbarMode} />
      {children}
    </>
  )
}

export default App
