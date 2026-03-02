import type React from 'react'
import styles from './skipLink.module.css'

const SkipLink = (): React.JSX.Element => {
  return (
    <a href="#main-content" className={styles['sr-only']}>
      Skip to content
    </a>
  )
}

export default SkipLink
