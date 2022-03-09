import { Routes, Route } from 'react-router'
import { StudySet } from '../components/StudySet/StudySet'
import { StudySetForm } from '../components/StudySetForm/StudySetForm'
import { Collection } from '../pages/Collection'
import { Home } from '../pages/Home'
import App from './App'

export enum ROUTES {
  root = '/',
  collection = 'collection',
  newStudySet = 'new-study-set',
  studySet = 'study-set',
}

export const Routing = () => {
  return (
    <Routes>
      <Route path={ROUTES.root} element={<App />}>
        <Route path={ROUTES.root} element={<Home />} />
        <Route path={ROUTES.newStudySet} element={<StudySetForm />} />
        <Route path={`${ROUTES.collection}`} element={<Collection />} />
        <Route path={`${ROUTES.studySet}/:studySetId`} element={<StudySet />} />
        <Route path="/*" element={<div>Not found!</div>} />
      </Route>
    </Routes>
  )
}
