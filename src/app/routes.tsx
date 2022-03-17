import { Routes, Route, Navigate, Outlet } from 'react-router'
import { Navbar } from '../components/Navbar/Navbar'
import { StudySetPage } from '../components/StudySet/StudySet'
import { StudySetForm } from '../components/StudySetForm/StudySetForm'
import { Collection } from '../pages/Collection'
import { Home } from '../pages/Home'
import { LandingPage } from '../pages/LandingPage/LandingPage'
import { LoginPage } from '../pages/LoginPage'
import { LogOutPage } from '../pages/LogOutPage'
import App from './App'
import { useAppSelector } from './hooks'

export enum ROUTES {
  root = '/',
  landing = '/home',
  collection = 'collection',
  newStudySet = 'new-study-set',
  studySet = 'study-set',
  logIn = 'log-in',
  logOut = 'log-out',
  signUp = 'sign-up',
}

export const Routing = () => {
  return (
    <Routes>
      <Route element={<App />}>
        <Route element={<RequireAuth />}>
          <Route path={ROUTES.root} element={<Home />} />
          <Route path={ROUTES.newStudySet} element={<StudySetForm />} />
          <Route path={`${ROUTES.collection}`} element={<Collection />} />

          <Route path={`${ROUTES.studySet}/:studySetId`} element={<StudySetPage />} />
          <Route path={`${ROUTES.studySet}/:studySetId/edit`} element={<StudySetForm />} />
          <Route path={ROUTES.logOut} element={<LogOutPage />} />
        </Route>

        <Route path={ROUTES.logIn} element={<LoginPage />} />
        <Route path={ROUTES.signUp} element={<div>sign up </div>} />
        <Route path={ROUTES.landing} element={<LandingPage />} />
        <Route path="/*" element={<div>Not found!</div>} />
      </Route>
    </Routes>
  )
}

const RequireAuth = () => {
  const user = useAppSelector((state) => state.auth.user)

  if (!user) {
    return <Navigate to={ROUTES.logIn} />
  }

  return <Outlet />
}
