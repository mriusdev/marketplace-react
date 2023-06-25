import { render, screen } from "@testing-library/react"
import { describe, it, vitest } from "vitest"
import { Home } from "../../pages/home"

describe('Initial test', () => {
  it('renders loading screen', () => {
    // ARRANGE - setup unit tests
    render(
      <Home />
    )
    
    // ACT - impersonate user
    // EXPECT - after user interacted with page have expected outcome
    expect(screen.getByRole('heading', {
      level: 1
    })).toHaveTextContent('Home page')
  })

  it ('does something', () => {
    
  })
})

// on initial render does loading screen get shown?
// after loading does home page get shown?
// what happens on error?
// test('on initial render display loading block', () => {
  
// })