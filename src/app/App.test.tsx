import React from 'react'
import { render, getByText, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from './store'
import App from './App'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router'
import '@testing-library/jest-dom/extend-expect'

describe('App', () => {
  test('full app rendering/navigating', () => {
    const history = createMemoryHistory()
    render(
      <Router history={history}>
        <App />
      </Router>
    )
    expect(screen.getByText(/Home/i)).toBeInTheDocument()
  })
})
