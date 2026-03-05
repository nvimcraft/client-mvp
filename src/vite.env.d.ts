/// <reference types="vite/client" />

declare module '*.mdx' {
  import type { ComponentType } from 'react'
  const Component: ComponentType<any>
  export default Component

  export const frontmatter: {
    title: string
    date: string
    description: string
    tags: string[]
  }
}
