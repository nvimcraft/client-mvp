import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from '@dr.pogodin/react-helmet'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { ThemeProvider } from './contexts/ThemeProvider'
import { routeTree } from './routeTree.gen'
import './styles/globals.css'

const rootElement = document.getElementById('root')

if (!(rootElement instanceof HTMLElement)) {
  throw new Error('Root element not found. Cannot mount React application.')
}

// Create a new router instance
const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

createRoot(rootElement).render(
  <StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </HelmetProvider>
  </StrictMode>
)
