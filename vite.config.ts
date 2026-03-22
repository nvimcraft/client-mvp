/// <reference types="vitest/config" />
import { fileURLToPath, URL } from 'node:url'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import { defineConfig } from 'vite'
import mdx from '@mdx-js/rollup'
import rehypeShiki from '@shikijs/rehype'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
  },
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),

    react({
      babel: {
        plugins: ['babel-plugin-react-compiler'],
      },
    }),

    mdx({
      remarkPlugins: [remarkGfm, remarkFrontmatter, remarkMdxFrontmatter],
      rehypePlugins: [
        [
          rehypeShiki,
          {
            themes: {
              light: 'everforest-dark',
              dark: 'everforest-dark',
            },
          },
        ],
      ],
    }),
  ],

  base: '/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  server: {
    port: 3000,
    strictPort: true,
    host: true, // listen on all addresses (LAN/public)
    hmr: {
      port: 3000,
    },
  },
})
