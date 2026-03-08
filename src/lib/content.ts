interface Post {
  slug: string
  title: string
  date: string
  description: string
  tags: string[]
}

export function getAllPosts(): Post[] {
  const modules = import.meta.glob('../content/*.mdx', {
    eager: true,
  })
  return (
    Object.entries(modules) as [string, { frontmatter: Omit<Post, 'slug'> }][]
  )
    .map(
      ([path, mod]: [
        string,
        {
          frontmatter?: Omit<Post, 'slug'>
          exports?: { frontmatter: Omit<Post, 'slug'> }
        },
      ]) => {
        const match = /\/content\/(.+)\.mdx$/.exec(path)
        if (!match) return null
        const frontmatter = mod.frontmatter ?? mod.exports?.frontmatter
        return {
          slug: match[1],
          ...frontmatter,
        }
      }
    )
    .filter((post): post is Post => post !== null)
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime() || 0
      const dateB = new Date(b.date).getTime() || 0
      return dateB - dateA
    })
}
export function getLatestPosts(limit = 3): Post[] {
  const posts = getAllPosts()
  return posts.slice(0, limit)
}
