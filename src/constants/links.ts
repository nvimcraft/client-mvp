import type { ComponentType } from 'react'
import GithubIcon from '@/components/icons/GithubIcon'
import InstagramIcon from '@/components/icons/InstagramIcon'
import LinkedinIcon from '@/components/icons/LinkedinIcon'
import type { IconProps } from '@/types/icons'

export interface LinksProps {
  id: string
  href: string
  ariaLabel: string
  IconComponent: ComponentType<IconProps>
}

export const links: LinksProps[] = [
  {
    id: 'github',
    href: 'https://github.com/nvimcraft',
    ariaLabel: "Visit RJ Leyva's GitHub Profile",
    IconComponent: GithubIcon,
  },

  {
    id: 'linkedin',
    href: 'https://linkedin.com/in/ryanjayleyva',
    ariaLabel: "Visit RJ Leyva's LinkedIn Profile",
    IconComponent: LinkedinIcon,
  },

  {
    id: 'instagram',
    href: 'https://instagram.com/slammedwigo',
    ariaLabel: "Visit RJ Leyva's Instagram Profile",
    IconComponent: InstagramIcon,
  },
]
