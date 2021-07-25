import { render, RenderResult } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Navbar } from './Navbar'
import { MemoryRouter } from 'react-router'

describe('Components/Navbar', () => {
  const renderComponent = (): RenderResult => render(<Navbar />, { wrapper: MemoryRouter })

  test('should render nav element', () => {
    const container = renderComponent()
    expect(container.getByRole('navigation')).toBe
  })

  test('should render correct links', () => {
    const { container } = renderComponent()
  })
})
