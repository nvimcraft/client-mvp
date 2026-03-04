import type React from 'react'
import { Link } from '@tanstack/react-router'
import Logo from '@/components/icons/Logo'
import Socials from '../Socials/Socials'
import ThemeToggle from '../ThemeToggle/ThemeToggle'
import styles from './header.module.css'

const Header = (): React.JSX.Element => {
  return (
    <header className={styles['header']}>
      <nav className={styles['header__nav']} aria-label="Main navigation">
        <Link to="/" aria-label="Home">
          <Logo />
        </Link>

        <div className={styles['header__actions']}>
          <ThemeToggle />
          <Socials />
        </div>
      </nav>
    </header>
  )
}

export default Header
