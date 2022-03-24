import { Routes, Route, Navigate, Outlet, useLocation } from 'react-router'
import { StudySetPage } from '../pages/StudySetPage/StudySetPage'
import { StudySetForm } from '../components/StudySetForm/StudySetForm'
import { CollectionPage } from '../pages/CollectionPage/CollectionPage'
import { Home } from '../pages/Home'
import { LandingPage } from '../pages/LandingPage/LandingPage'
import { LoginPage } from '../pages/LoginPage/LoginPage'
import { LogOutPage } from '../pages/LogOutPage'
import App from './App'
import { useAppSelector } from './hooks'
import { StudyModePage } from '../pages/StudyModePage/StudyModePage'
import { StudySetFormPage } from '../pages/StudySetFormPage/StudySetFormPage'

export enum ROUTES {
  root = '/',
  landing = '/home',
  collection = 'collection',
  newStudySet = 'new-study-set',
  studySet = 'study-set',
  logIn = 'log-in',
  logOut = 'log-out',
  signUp = 'sign-up',
  edit = 'edit',
  flashcardMode = 'flashcards',
  quizMode = 'quiz',
}

export const Routing = () => {
  const location = useLocation()
  return (
    <Routes>
      <Route element={<App />}>
        <Route element={<RequireAuth />}>
          <Route path={ROUTES.root} element={<Home />} />
          <Route path={ROUTES.newStudySet} element={<StudySetFormPage />} />
          <Route path={`${ROUTES.collection}`} element={<CollectionPage />} />

          <Route
            path={`${ROUTES.studySet}/:studySetId`}
            element={<StudySetPage />}
          />
          <Route
            path={`${ROUTES.studySet}/:studySetId/${ROUTES.edit}`}
            element={<StudySetFormPage key={location.key} />}
          />
          <Route
            path={`${ROUTES.studySet}/:studySetId/${ROUTES.flashcardMode}`}
            element={<StudyModePage mode={'flashcards'} />}
          />
          <Route
            path={`${ROUTES.studySet}/:studySetId/${ROUTES.flashcardMode}/fav`}
            element={<StudyModePage mode={'flashcards'} onlyFavorites={true} />}
          />
          <Route path={ROUTES.logOut} element={<LogOutPage />} />
        </Route>

        <Route
          path={ROUTES.logIn}
          element={<LoginPage pageType={ROUTES.logIn} />}
        />
        <Route
          path={ROUTES.signUp}
          element={<LoginPage pageType={ROUTES.signUp} />}
        />
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
