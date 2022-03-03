import React, { useContext } from 'react'
import { BrowserRouter as Router, Switch, Route, useRouteMatch } from 'react-router-dom'
import GlobalStyle from '../theme/GlobalStyles'
import Collection from '../pages/Collection'
import { Navbar } from '../components/Navbar/Navbar'
import { StudySetForm } from '../components/StudySetForm/StudySetForm'
import Home from '../pages/Home'
import { FirebaseContextProvider } from '../firebase/firebaseContextProvider'
import { StudySet } from '../components/StudySet/StudySet'

function App() {
  return (
    <div>
      {' '}
      <GlobalStyle />
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/collection">
            <CollectionRoutes />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

function CollectionRoutes() {
  const match = useRouteMatch()
  return (
    <>
      <Switch>
        <Route path={`${match.path}/newStudySet`} component={StudySetForm}></Route>
        <Route exact path={`${match.path}`} component={Collection}></Route>
        <Route exact path={`${match.path}/:slug`} component={StudySet}></Route>
      </Switch>
    </>
  )
}

export default App
