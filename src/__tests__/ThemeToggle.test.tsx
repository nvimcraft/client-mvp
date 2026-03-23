import type React from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import ThemeToggle from '@/components/ui/ThemeToggle/ThemeToggle'
import { useTheme } from '@/hooks/useTheme'

vi.mock('@/hooks/useTheme')
vi.mock('@/components/icons/MoonIcon', () => ({
  default: (): React.JSX.Element => <svg data-testid="moon-icon" />,
}))
vi.mock('@/components/icons/SunIcon', () => ({
  default: (): React.JSX.Element => <svg data-testid="sun-icon" />,
}))

describe('ThemeToggle', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the toggle button', () => {
    vi.mocked(useTheme).mockReturnValue({
      theme: 'light',
      toggleTheme: vi.fn(),
      setTheme: vi.fn(),
    })

    render(<ThemeToggle />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('renders MoonIcon when theme is light', () => {
    vi.mocked(useTheme).mockReturnValue({
      theme: 'light',
      toggleTheme: vi.fn(),
      setTheme: vi.fn(),
    })

    render(<ThemeToggle />)
    expect(screen.getByTestId('moon-icon')).toBeInTheDocument()
    expect(screen.queryByTestId('sun-icon')).not.toBeInTheDocument()
  })

  it('renders SunIcon when theme is dark', () => {
    vi.mocked(useTheme).mockReturnValue({
      theme: 'dark',
      toggleTheme: vi.fn(),
      setTheme: vi.fn(),
    })

    render(<ThemeToggle />)
    expect(screen.getByTestId('sun-icon')).toBeInTheDocument()
    expect(screen.queryByTestId('moon-icon')).not.toBeInTheDocument()
  })

  it('has correct aria-label for light mode', () => {
    vi.mocked(useTheme).mockReturnValue({
      theme: 'light',
      toggleTheme: vi.fn(),
      setTheme: vi.fn(),
    })

    render(<ThemeToggle />)
    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-label',
      'Switch to dark mode'
    )
  })

  it('has correct aria-label for dark mode', () => {
    vi.mocked(useTheme).mockReturnValue({
      theme: 'dark',
      toggleTheme: vi.fn(),
      setTheme: vi.fn(),
    })

    render(<ThemeToggle />)
    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-label',
      'Switch to light mode'
    )
  })

  it('calls toggleTheme when button is clicked', () => {
    const mockToggleTheme = vi.fn()
    vi.mocked(useTheme).mockReturnValue({
      theme: 'light',
      toggleTheme: mockToggleTheme,
      setTheme: vi.fn(),
    })

    render(<ThemeToggle />)
    fireEvent.click(screen.getByRole('button'))
    expect(mockToggleTheme).toHaveBeenCalledTimes(1)
  })
})
