import type React from 'react'
import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Header from '@/components/ui/Header/Header'

vi.mock('@/components/icons/Logo', () => ({
  default: (): React.JSX.Element => <svg data-testid="logo" />,
}))

vi.mock('@/components/ui/Socials/Socials', () => ({
  default: (): React.JSX.Element => <div data-testid="socials" />,
}))

vi.mock('@/components/ui/ThemeToggle/ThemeToggle', () => ({
  default: (): React.JSX.Element => (
    <button data-testid="theme-toggle">Toggle</button>
  ),
}))

vi.mock('@tanstack/react-router', () => ({
  Link: ({
    children,
    to,
    ...rest
  }: {
    children: React.ReactNode
    to: string
    [key: string]: unknown
  }): React.JSX.Element => (
    <a href={to} {...rest}>
      {children}
    </a>
  ),
}))

describe('Header', () => {
  it('renders the header element', () => {
    render(<Header />)
    expect(screen.getByRole('banner')).toBeInTheDocument()
  })

  it('renders the navigation with correct aria-label', () => {
    render(<Header />)
    expect(
      screen.getByRole('navigation', { name: 'Main navigation' })
    ).toBeInTheDocument()
  })

  it('renders the logo link pointing to home', () => {
    render(<Header />)
    const homeLink = screen.getByRole('link', { name: 'Home' })
    expect(homeLink).toHaveAttribute('href', '/')
  })

  it('renders the theme toggle', () => {
    render(<Header />)
    expect(screen.getByTestId('theme-toggle')).toBeInTheDocument()
  })

  it('renders the socials component', () => {
    render(<Header />)
    expect(screen.getByTestId('socials')).toBeInTheDocument()
  })

  it('renders all actions in the header', () => {
    render(<Header />)
    const actions = screen.getByTestId('theme-toggle')
    const socials = screen.getByTestId('socials')
    expect(actions).toBeInTheDocument()
    expect(socials).toBeInTheDocument()
  })
})
