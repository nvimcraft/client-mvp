import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Hero from './Hero'

vi.mock('@/lib/content', () => ({
  getLatestPosts: vi.fn(() => []),
}))

describe('Hero', () => {
  const defaultProps = {
    greeting: 'Hello, World!',
    wavingEmoji: '👋',
    about: 'I am a developer.',
  }

  it('renders the greeting in the heading', () => {
    render(<Hero {...defaultProps} />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Hello, World!'
    )
  })

  it('renders the waving emoji', () => {
    render(<Hero {...defaultProps} />)
    expect(screen.getByText('👋')).toBeInTheDocument()
  })

  it('renders the about text in sub-heading', () => {
    render(<Hero {...defaultProps} />)
    expect(screen.getByText('I am a developer.')).toBeInTheDocument()
  })

  it('renders the RecentPosts component', () => {
    render(<Hero {...defaultProps} />)
    expect(screen.getByText('Recent Posts')).toBeInTheDocument()
  })

  it('renders the section with correct id', () => {
    render(<Hero {...defaultProps} />)
    const section = document.querySelector('section')
    expect(section).toHaveAttribute('id', 'Hero content')
  })

  it('renders the heading with correct structure', () => {
    render(<Hero {...defaultProps} />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent('Hello, World!')
    expect(heading).toContainElement(screen.getByText('👋'))
  })
})
