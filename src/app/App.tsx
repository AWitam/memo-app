import React from 'react'
import { BrowserRouter as Router, Switch, Route, useRouteMatch } from 'react-router-dom'
import GlobalStyle from '../theme/GlobalStyles'
import Collection from '../pages/Collection'
import { Navbar } from '../components/Navbar/Navbar'
import { CreateNewStudySet } from '../components/createNewStudySet/CreateNewStudySet'

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Collection />
          </Route>
          <Route path="/collection">
            <CollectionRoutes />
          </Route>
        </Switch>
      </Router>
    </>
  )
}

function CollectionRoutes() {
  const match = useRouteMatch()
  return (
    <>
      <Switch>
        <Route path={`${match.path}/newStudySet`} component={CreateNewStudySet}></Route>
        <Route path={`${match.path}/collection`} component={Collection}></Route>
      </Switch>
    </>
  )
}

export default App
