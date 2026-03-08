import React from 'react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/posts/$slug')({
  loader: ({ params }: { params: { slug: string } }) => {
    const modules = import.meta.glob('../content/*.mdx', { eager: true })
    const post = Object.entries(modules).find(([path]) =>
      path.includes(`/${params.slug}.mdx`)
    )
    if (!post) throw new Error('Post not found')
    const mod = post[1] as {
      default: React.ComponentType
      frontmatter: {
        title: string
        date: string
        description: string
        tags: string[]
      }
    }
    return {
      component: mod.default,
      frontmatter: mod.frontmatter,
    }
  },
  component: RouteComponent,
})
function RouteComponent(): React.ReactElement {
  const { component: MDXContent, frontmatter } = Route.useLoaderData()

  return (
    <article>
      <h1>{frontmatter.title}</h1>
      <time>{frontmatter.date}</time>
      <MDXContent />
    </article>
  )
}
