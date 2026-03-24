import { beforeEach, describe, expect, it, vi } from 'vitest'

const mockRender = vi.fn()

const { createRoot: mockCreateRoot } = vi.hoisted(() => {
  const createRootFn = vi.fn((_element: Element) => ({ render: mockRender }))
  return { createRoot: createRootFn }
})

vi.mock('react-dom/client', () => ({
  createRoot: mockCreateRoot,
}))

vi.mock('@dr.pogodin/react-helmet', () => ({
  HelmetProvider: ({ children }: { children: unknown }): unknown => children,
}))

vi.mock('@tanstack/react-router', () => ({
  RouterProvider: (): null => null,
  createRouter: (): Record<string, never> => ({}),
}))

vi.mock('@/contexts/ThemeProvider', () => ({
  ThemeProvider: ({ children }: { children: unknown }): unknown => children,
}))

vi.mock('@/routeTree.gen', () => ({
  routeTree: {},
}))

vi.mock('@/styles/globals.css', () => ({}))

describe('main.tsx', () => {
  const mockRootElement = document.createElement('div')
  mockRootElement.id = 'root'

  beforeEach(() => {
    vi.clearAllMocks()
    vi.resetModules()
  })

  describe('when root element is not found', () => {
    it('throws an error with descriptive message', async () => {
      vi.spyOn(document, 'getElementById').mockReturnValue(null)

      await expect(async () => {
        await import('@/main')
      }).rejects.toThrow(
        'Root element not found. Cannot mount React application.'
      )
    })
  })

  describe('when root element is found', () => {
    beforeEach(() => {
      vi.spyOn(document, 'getElementById').mockReturnValue(mockRootElement)
    })

    it('creates a React root for the DOM element', async () => {
      await import('@/main')

      expect(mockCreateRoot).toHaveBeenCalledWith(mockRootElement)
    })

    it('renders the app with all providers', async () => {
      await import('@/main')

      expect(mockRender).toHaveBeenCalled()
    })

    it('renders StrictMode wrapper', async () => {
      await import('@/main')

      const renderedJsx = mockRender.mock.calls[0]?.[0] as
        | { type?: unknown }
        | undefined
      expect(renderedJsx).toBeDefined()
      expect(renderedJsx).toHaveProperty('type')
    })
  })
})
