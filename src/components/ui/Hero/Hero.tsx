import type React from 'react'
import styles from './hero.module.css'

interface HeroProps {
  greeting: string
  wavingEmoji: string
  about: string
}

const Hero = ({
  greeting: greeting,
  wavingEmoji,
  about,
}: HeroProps): React.JSX.Element => {
  return (
    <section className={styles['hero']} id="Hero content">
      <h1 className={styles['hero__heading']}>
        {greeting}
        <span className={styles['hero__waving-emoji']}>{wavingEmoji}</span>
      </h1>
      <p className={styles['hero__sub-heading']}>{about}</p>
    </section>
  )
}

export default Hero
