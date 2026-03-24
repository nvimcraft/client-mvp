import { beforeEach, describe, expect, it, vi } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { ThemeProvider } from '@/contexts/ThemeProvider'
import { useTheme } from '@/hooks/useTheme'

const mockLocalStorage: Storage = {
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
  ;(mockLocalStorage.getItem as ReturnType<typeof vi.fn>).mockReturnValue(null)
})

describe('useTheme', () => {
  it('throws error when used outside ThemeProvider', () => {
    const consoleError = vi.spyOn(console, 'error').mockReturnValue()
    expect(() => renderHook(() => useTheme())).toThrow(
      'useTheme must be used within ThemeProvider'
    )
    consoleError.mockRestore()
  })

  it('returns theme from context', () => {
    const { result } = renderHook(() => useTheme(), { wrapper: ThemeProvider })
    expect(result.current.theme).toBeDefined()
    expect(['light', 'dark']).toContain(result.current.theme)
  })

  it('returns toggleTheme function', () => {
    const { result } = renderHook(() => useTheme(), { wrapper: ThemeProvider })
    expect(result.current.toggleTheme).toBeDefined()
    expect(typeof result.current.toggleTheme).toBe('function')
  })

  it('returns setTheme function', () => {
    const { result } = renderHook(() => useTheme(), { wrapper: ThemeProvider })
    expect(result.current.setTheme).toBeDefined()
    expect(typeof result.current.setTheme).toBe('function')
  })

  it('toggles theme from light to dark', () => {
    const { result } = renderHook(() => useTheme(), { wrapper: ThemeProvider })
    const initialTheme = result.current.theme
    act(() => {
      result.current.toggleTheme()
    })
    expect(result.current.theme).toBe(
      initialTheme === 'light' ? 'dark' : 'light'
    )
  })

  it('sets theme explicitly', () => {
    const { result } = renderHook(() => useTheme(), { wrapper: ThemeProvider })
    act(() => {
      result.current.setTheme('dark')
    })
    expect(result.current.theme).toBe('dark')
    act(() => {
      result.current.setTheme('light')
    })
    expect(result.current.theme).toBe('light')
  })
})
