import type React from 'react'
import type { IconProps } from '@/types/icons'

const Logo = ({
  size = 24,
  ariaLabel = 'Site Logo',
  title = 'Go to Home Page',
  ref,
  ...props
}: IconProps): React.JSX.Element => {
  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-label={ariaLabel}
      role="img"
      {...props}
    >
      <title>{title}</title>
      <rect width="9" height="6" x="6" y="14" rx="2" />
      <rect width="16" height="6" x="6" y="4" rx="2" />
    </svg>
  )
}

export default Logo
