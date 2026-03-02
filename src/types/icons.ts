import type { Ref, SVGProps } from 'react'

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'size'> {
  size?: number
  ref?: Ref<SVGSVGElement>
}
