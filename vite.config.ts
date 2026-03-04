import { fileURLToPath, URL } from 'node:url'
import remarkGfm from 'remark-gfm'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import { defineConfig } from 'vite'
import mdx from '@mdx-js/rollup'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
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
      remarkPlugins: [remarkGfm, remarkMdxFrontmatter],
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
