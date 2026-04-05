import type React from 'react'
import GiscusComponent from '@giscus/react'
import { useTheme } from '@/hooks/useTheme'
import styles from './giscus.module.css'

interface GiscusProps {
  term?: string
}

const Giscus = ({ term }: GiscusProps): React.JSX.Element => {
  const { theme } = useTheme()

  const isDark = theme === 'dark'

  return (
    <section className={styles['giscus-section']}>
      <h2 className={styles['giscus-heading']}>Comments</h2>
      <div className={styles['giscus-wrapper']}>
        <GiscusComponent
          repo="nvimcraft/client-mvp"
          repoId="R_kgDORb7KOg"
          category="General"
          categoryId="DIC_kwDORb7KOs4C6Hv4"
          mapping={term !== undefined ? 'specific' : 'pathname'}
          {...(term !== undefined ? { term } : {})}
          theme={isDark ? 'dark' : 'light'}
          lang="en"
          loading="lazy"
        />
      </div>
    </section>
  )
}

export default Giscus
