import type React from 'react'
import { getLatestPosts } from '@/lib/content'
import styles from './recent-posts.module.css'

const RecentPosts = (): React.JSX.Element => {
  const posts = getLatestPosts(3)
  return (
    <section className={styles['recent-posts']}>
      <h2 className={styles['recent-posts__title']}>Recent Posts</h2>
      <ul className={styles['recent-posts__list']}>
        {posts.map(post => (
          <li key={post.slug} className={styles['recent-posts__item']}>
            <time className={styles['recent-posts__date']}>{post.date}</time>
            <div className={styles['recent-posts__content']}>
              <a
                href={`/posts/${post.slug}`}
                className={styles['recent-posts__link']}
              >
                <h3 className={styles['recent-posts__post-title']}>
                  {post.title}
                </h3>
              </a>
              <p className={styles['recent-posts__description']}>
                {post.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
export default RecentPosts
