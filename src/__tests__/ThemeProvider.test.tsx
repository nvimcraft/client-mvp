import { beforeEach, describe, expect, it, vi } from 'vitest'
import { act, render, renderHook } from '@testing-library/react'
import { ThemeProvider } from '@/contexts/ThemeProvider'
import { useTheme } from '@/hooks/useTheme'

const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
  key: vi.fn(),
  get length(): number {
    return 0
  },
}
Object.defineProperty(globalThis, 'localStorage', { value: mockLocalStorage })

const defaultMatchMediaResult = {
  matches: false,
  media: '',
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
}
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    ...defaultMatchMediaResult,
    media: query,
  })),
})

beforeEach(() => {
  vi.clearAllMocks()
  vi.mocked(mockLocalStorage.getItem).mockReturnValue(null)
  document.documentElement.removeAttribute('data-theme')
  document.documentElement.style.colorScheme = ''
  const meta = document.querySelector('meta[name="color-scheme"]')
  if (meta) meta.remove()
})

describe('ThemeProvider', () => {
  it('provides default light theme when no localStorage or media query', () => {
    const { result } = renderHook(() => useTheme(), { wrapper: ThemeProvider })
    expect(result.current.theme).toBe('light')
  })

  it('reads theme from localStorage', () => {
    vi.mocked(mockLocalStorage.getItem).mockReturnValue('dark')
    const { result } = renderHook(() => useTheme(), { wrapper: ThemeProvider })
    expect(result.current.theme).toBe('dark')
  })

  it('setTheme updates state and localStorage', () => {
    const { result } = renderHook(() => useTheme(), { wrapper: ThemeProvider })
    act(() => {
      result.current.setTheme('dark')
    })
    expect(result.current.theme).toBe('dark')
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      'nvimcraft-theme',
      'dark'
    )
  })

  it('toggleTheme switches from light to dark', () => {
    const { result } = renderHook(() => useTheme(), { wrapper: ThemeProvider })
    act(() => {
      result.current.toggleTheme()
    })
    expect(result.current.theme).toBe('dark')
  })

  it('toggleTheme switches from dark to light', () => {
    vi.mocked(mockLocalStorage.getItem).mockReturnValue('dark')
    const { result } = renderHook(() => useTheme(), { wrapper: ThemeProvider })
    act(() => {
      result.current.toggleTheme()
    })
    expect(result.current.theme).toBe('light')
  })

  it('sets data-theme attribute on documentElement', () => {
    vi.mocked(mockLocalStorage.getItem).mockReturnValue('dark')
    render(
      <ThemeProvider>
        <div>Test</div>
      </ThemeProvider>
    )
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
  })

  it('sets colorScheme style on documentElement', () => {
    vi.mocked(mockLocalStorage.getItem).mockReturnValue('dark')
    render(
      <ThemeProvider>
        <div>Test</div>
      </ThemeProvider>
    )
    expect(document.documentElement.style.colorScheme).toBe('dark')
  })

  it('creates meta color-scheme if not exists', () => {
    vi.mocked(mockLocalStorage.getItem).mockReturnValue('dark')
    render(
      <ThemeProvider>
        <div>Test</div>
      </ThemeProvider>
    )
    const meta = document.querySelector('meta[name="color-scheme"]')
    expect(meta).not.toBeNull()
    expect(meta?.getAttribute('content')).toBe('dark')
  })

  it('updates existing meta color-scheme', () => {
    vi.mocked(mockLocalStorage.getItem).mockReturnValue('dark')
    const meta = document.createElement('meta')
    meta.name = 'color-scheme'
    meta.content = 'light'
    document.head.appendChild(meta)

    render(
      <ThemeProvider>
        <div>Test</div>
      </ThemeProvider>
    )
    expect(meta.getAttribute('content')).toBe('dark')
  })
})
