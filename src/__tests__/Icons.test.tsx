/**
 * NOTE: This test file combines tests for multiple icon components
 * (GithubIcon, InstagramIcon, LinkedinIcon, Logo, MoonIcon, SunIcon).
 *
 * In CLI (pnpm test), all tests pass.
 * In neotest, tests may fail to parse correctly due to the combined structure.
 *
 * This is a known limitation - neotest-vitest expects 1 test file per component.
 * If neotest support is critical, split into separate files:
 * - GithubIcon.test.tsx
 * - InstagramIcon.test.tsx
 * - etc.
 **/

import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import GithubIcon from '@/components/icons/GithubIcon'
import InstagramIcon from '@/components/icons/InstagramIcon'
import LinkedinIcon from '@/components/icons/LinkedinIcon'
import Logo from '@/components/icons/Logo'
import MoonIcon from '@/components/icons/MoonIcon'
import SunIcon from '@/components/icons/SunIcon'

const icons = {
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  Logo,
  MoonIcon,
  SunIcon,
}

describe('Icons', () => {
  it.each(Object.entries(icons))('renders %s', (_, Icon) => {
    render(<Icon />)
    expect(document.querySelector('svg')).toBeInTheDocument()
  })

  it.each(Object.entries(icons))('applies custom size to %s', (_, Icon) => {
    render(<Icon size={32} />)
    expect(document.querySelector('svg')).toHaveAttribute('width', '32')
    expect(document.querySelector('svg')).toHaveAttribute('height', '32')
  })

  it.each(Object.entries(icons))('%s has aria-hidden by default', (_, Icon) => {
    render(<Icon />)
    expect(document.querySelector('svg')).toHaveAttribute('aria-hidden', 'true')
  })

  it.each(Object.entries(icons))('supports className on %s', (_, Icon) => {
    render(<Icon className="test-class" />)
    expect(document.querySelector('.test-class')).toBeInTheDocument()
  })
})
