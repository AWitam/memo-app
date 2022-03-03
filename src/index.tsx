import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { store } from './app/store'
import { Provider } from 'react-redux'
import { FirebaseContextProvider } from './firebase/firebaseContextProvider'
import { BrowserRouter } from 'react-router-dom'
import { Routing } from './app/routes'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <FirebaseContextProvider>
          <Routing />
        </FirebaseContextProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
