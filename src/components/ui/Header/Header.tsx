import type React from 'react'
import { Link } from '@tanstack/react-router'
import Logo from '@/components/icons/Logo'
import Socials from '../Socials/Socials'
import styles from './header.module.css'

const Header = (): React.JSX.Element => {
  return (
    <header className={styles['header']}>
      <nav className={styles['header__nav']} aria-label="Main navigation">
        <Link to="/" aria-label="Home">
          <Logo />
        </Link>
        <Socials />
      </nav>
    </header>
  )
}

export default Header
