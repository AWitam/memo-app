import React, { useContext } from 'react'
import { Routes, Route, Outlet } from 'react-router-dom'
import GlobalStyle from '../theme/GlobalStyles'
import { Home } from '../pages/Home'
import { Navbar } from '../components/Navbar/Navbar'

function App() {
  return (
    <>
      <GlobalStyle />
      <Navbar />
    </>
  )
}

export default App
