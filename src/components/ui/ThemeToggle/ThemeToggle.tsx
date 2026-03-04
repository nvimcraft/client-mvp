import type React from 'react'
import { useTheme } from '@/hooks/useTheme'
import MoonIcon from '../../icons/MoonIcon'
import SunIcon from '../../icons/SunIcon'
import styles from './theme-toggle.module.css'

const ThemeToggle = (): React.JSX.Element => {
  const { theme, toggleTheme } = useTheme()

  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className={styles['toggle-button']}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  )
}

export default ThemeToggle
