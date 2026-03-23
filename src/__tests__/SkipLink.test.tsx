import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import SkipLink from '@/components/ui/SkipLink/SkipLink'

describe('SkipLink', () => {
  it('renders as an anchor element', () => {
    render(<SkipLink />)
    expect(screen.getByRole('link')).toBeInTheDocument()
  })

  it('has correct href', () => {
    render(<SkipLink />)
    expect(screen.getByRole('link')).toHaveAttribute('href', '#main-content')
  })

  it('has correct link text', () => {
    render(<SkipLink />)
    expect(screen.getByRole('link')).toHaveTextContent('Skip to content')
  })

  it('applies sr-only class', () => {
    render(<SkipLink />)
    const link = screen.getByRole('link')
    expect(link.className).toContain('sr-only')
  })
})
