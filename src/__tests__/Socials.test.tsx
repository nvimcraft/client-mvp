import type React from 'react'
import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Socials from '@/components/ui/Socials/Socials'

vi.mock('@/components/icons/GithubIcon', () => ({
  default: (): React.JSX.Element => <svg data-testid="github-icon" />,
}))

vi.mock('@/components/icons/LinkedinIcon', () => ({
  default: (): React.JSX.Element => <svg data-testid="linkedin-icon" />,
}))

vi.mock('@/components/icons/InstagramIcon', () => ({
  default: (): React.JSX.Element => <svg data-testid="instagram-icon" />,
}))

describe('Socials', () => {
  it('renders the nav element with correct aria-label', () => {
    render(<Socials />)
    expect(
      screen.getByRole('navigation', { name: 'Social media profiles' })
    ).toBeInTheDocument()
  })

  it('renders the unordered list', () => {
    render(<Socials />)
    expect(screen.getByRole('list')).toBeInTheDocument()
  })

  it('renders all 3 social links', () => {
    render(<Socials />)
    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(3)
  })

  it('renders GitHub link with correct href', () => {
    render(<Socials />)
    const githubLink = screen.getByLabelText(/GitHub/i)
    expect(githubLink).toHaveAttribute('href', 'https://github.com/nvimcraft')
  })

  it('renders LinkedIn link with correct href', () => {
    render(<Socials />)
    const linkedinLink = screen.getByLabelText(/LinkedIn/i)
    expect(linkedinLink).toHaveAttribute(
      'href',
      'https://linkedin.com/in/ryanjayleyva'
    )
  })

  it('renders Instagram link with correct href', () => {
    render(<Socials />)
    const instagramLink = screen.getByLabelText(/Instagram/i)
    expect(instagramLink).toHaveAttribute(
      'href',
      'https://instagram.com/slammedwigo'
    )
  })

  it('links open in new tab', () => {
    render(<Socials />)
    const links = screen.getAllByRole('link')
    links.forEach(link => {
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })

  it('links have correct aria-label indicating new tab', () => {
    render(<Socials />)
    const githubLink = screen.getByLabelText(/GitHub/i)
    expect(githubLink).toHaveAttribute(
      'aria-label',
      "Visit RJ Leyva's GitHub Profile (opens in a new tab)"
    )
  })

  it('renders all icon components', () => {
    render(<Socials />)
    expect(screen.getByTestId('github-icon')).toBeInTheDocument()
    expect(screen.getByTestId('linkedin-icon')).toBeInTheDocument()
    expect(screen.getByTestId('instagram-icon')).toBeInTheDocument()
  })

  it('list items have correct keys', () => {
    const { container } = render(<Socials />)
    const listItems = container.querySelectorAll('li')
    expect(listItems).toHaveLength(3)
  })
})
