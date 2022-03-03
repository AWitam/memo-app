import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './app/App'
import { store } from './app/store'
import { Provider } from 'react-redux'
import { FirebaseContextProvider } from './firebase/firebaseContextProvider'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <FirebaseContextProvider>
        <App />
      </FirebaseContextProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
