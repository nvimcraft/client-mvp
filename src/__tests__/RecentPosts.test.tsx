import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import RecentPosts from '@/components/ui/RecentPosts/RecentPosts'

const mockPosts = [
  {
    slug: 'first-post',
    title: 'First Post',
    date: '2024-01-01',
    description: 'This is the first post',
    tags: ['react'],
  },
  {
    slug: 'second-post',
    title: 'Second Post',
    date: '2024-01-15',
    description: 'This is the second post',
    tags: ['typescript'],
  },
  {
    slug: 'third-post',
    title: 'Third Post',
    date: '2024-02-01',
    description: 'This is the third post',
    tags: ['css'],
  },
]

vi.mock('@/lib/content', () => ({
  getLatestPosts: vi.fn(() => mockPosts),
}))

describe('RecentPosts', () => {
  it('renders section with correct class', () => {
    render(<RecentPosts />)
    const section = document.querySelector('section')
    expect(section?.className).toContain('recent-posts')
  })

  it('renders section title', () => {
    render(<RecentPosts />)
    expect(screen.getByText('Recent Posts')).toBeInTheDocument()
  })

  it('renders correct number of posts', () => {
    render(<RecentPosts />)
    const listItems = screen.getAllByRole('listitem')
    expect(listItems).toHaveLength(3)
  })

  it('renders post dates', () => {
    render(<RecentPosts />)
    expect(screen.getByText('2024-01-01')).toBeInTheDocument()
    expect(screen.getByText('2024-01-15')).toBeInTheDocument()
    expect(screen.getByText('2024-02-01')).toBeInTheDocument()
  })

  it('renders post titles as links', () => {
    render(<RecentPosts />)
    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(3)
    expect(links[0]).toHaveAttribute('href', '/posts/first-post')
    expect(links[1]).toHaveAttribute('href', '/posts/second-post')
    expect(links[2]).toHaveAttribute('href', '/posts/third-post')
  })

  it('renders post descriptions', () => {
    render(<RecentPosts />)
    expect(screen.getByText('This is the first post')).toBeInTheDocument()
    expect(screen.getByText('This is the second post')).toBeInTheDocument()
    expect(screen.getByText('This is the third post')).toBeInTheDocument()
  })

  it('renders post titles', () => {
    render(<RecentPosts />)
    expect(screen.getByText('First Post')).toBeInTheDocument()
    expect(screen.getByText('Second Post')).toBeInTheDocument()
    expect(screen.getByText('Third Post')).toBeInTheDocument()
  })

  it('renders list with correct class', () => {
    render(<RecentPosts />)
    const list = document.querySelector('ul')
    expect(list?.className).toContain('recent-posts__list')
  })
})
