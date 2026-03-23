import { describe, expect, it } from 'vitest'
import { getAllPosts, getLatestPosts } from '@/lib/content'

describe('content.ts', () => {
  describe('getAllPosts', () => {
    it('returns all posts sorted by date descending', () => {
      const allPosts = getAllPosts()

      expect(allPosts.length).toBeGreaterThan(0)

      for (
        let currentIndex = 1;
        currentIndex < allPosts.length;
        currentIndex++
      ) {
        const previousPost = allPosts[currentIndex - 1]
        const currentPost = allPosts[currentIndex]
        if (!previousPost || !currentPost) return
        const previousDate = new Date(previousPost.date).getTime()
        const currentDate = new Date(currentPost.date).getTime()
        expect(previousDate).toBeGreaterThanOrEqual(currentDate)
      }
    })

    it('extracts slug correctly from filename', () => {
      const posts = getAllPosts()
      const slugs = posts.map(p => p.slug)

      expect(slugs).toContain('why-transition-all-is-risky')
      expect(slugs).toContain('native-lsp-setup-in-neovim')
      expect(slugs).toContain('wezterm-terminal-setup')
    })

    it('includes all required frontmatter fields', () => {
      const allPosts = getAllPosts()

      for (const post of allPosts) {
        expect(post.slug).toBeDefined()
        expect(post.title).toBeDefined()
        expect(post.date).toBeDefined()
        expect(post.description).toBeDefined()
        expect(post.tags).toBeDefined()
      }
    })

    it('has correct field types', () => {
      const posts = getAllPosts()

      for (const post of posts) {
        expect(typeof post.slug).toBe('string')
        expect(typeof post.title).toBe('string')
        expect(typeof post.date).toBe('string')
        expect(typeof post.description).toBe('string')
        expect(Array.isArray(post.tags)).toBe(true)
      }
    })

    it('validates dates are parseable', () => {
      const posts = getAllPosts()

      for (const post of posts) {
        const parsedDate = new Date(post.date)
        expect(isNaN(parsedDate.getTime())).toBe(false)
      }
    })

    it('validates tags contain only strings', () => {
      const posts = getAllPosts()

      for (const post of posts) {
        expect(post.tags.length).toBeGreaterThan(0)
        for (const tag of post.tags) {
          expect(typeof tag).toBe('string')
          expect(tag.length).toBeGreaterThan(0)
        }
      }
    })

    it('filters out invalid paths', () => {
      const posts = getAllPosts()
      const slugs = posts.map(p => p.slug)

      expect(slugs).not.toContain('')
    })
  })

  describe('getLatestPosts', () => {
    it('returns limited number of posts', () => {
      const allPosts = getAllPosts()
      const limit = 2
      const posts = getLatestPosts(limit)

      expect(posts.length).toBeLessThanOrEqual(limit)
      expect(posts.length).toBeLessThanOrEqual(allPosts.length)
    })

    it('defaults to 3 posts when no limit provided', () => {
      const allPosts = getAllPosts()
      const posts = getLatestPosts()

      expect(posts.length).toBeLessThanOrEqual(3)
      expect(posts.length).toBeLessThanOrEqual(allPosts.length)
    })

    it('returns posts sorted by date descending', () => {
      const latestPosts = getLatestPosts(3)

      for (
        let currentIndex = 1;
        currentIndex < latestPosts.length;
        currentIndex++
      ) {
        const previousPost = latestPosts[currentIndex - 1]
        const currentPost = latestPosts[currentIndex]
        if (!previousPost || !currentPost) return
        const previousDate = new Date(previousPost.date).getTime()
        const currentDate = new Date(currentPost.date).getTime()
        expect(previousDate).toBeGreaterThanOrEqual(currentDate)
      }
    })

    it('returns posts from getAllPosts', () => {
      const allPosts = getAllPosts()
      const latestPosts = getLatestPosts(2)

      for (const post of latestPosts) {
        expect(allPosts).toContainEqual(post)
      }
    })

    it('handles limit larger than total posts', () => {
      const allPosts = getAllPosts()
      const largeLimit = 100
      const posts = getLatestPosts(largeLimit)

      expect(posts.length).toBe(allPosts.length)
    })
  })
})
