/*
  Socials BEM:
  - .socials: Block (container styled by parent)
  - .socials__list: Horizontal flex layout
  - .socials__item: List item
  - .socials__link: Anchor (hover/focus styles)
 */

import type React from 'react'
import { links } from '@/constants/links'
import styles from './socials.module.css'

const Socials = (): React.JSX.Element => {
  return (
    <nav className={styles['socials']} aria-label="Social media profiles">
      <ul className={styles['socials__list']}>
        {links.map(({ id, href, ariaLabel, IconComponent }) => (
          <li className={styles['socials__item']} key={id}>
            <a
              className={styles['socials__link']}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${ariaLabel} (opens in a new tab)`}
            >
              <IconComponent />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Socials
