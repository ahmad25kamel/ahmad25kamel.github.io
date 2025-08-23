import { describe, it, expect, vi } from 'vitest'
import { formatFileSize, isValidUrl, generateId, debounce } from '@/utils/helpers'

describe('helpers utility functions', () => {
  describe('formatFileSize', () => {
    it('formats bytes correctly', () => {
      expect(formatFileSize(0)).toBe('0 Bytes')
      expect(formatFileSize(1024)).toBe('1 KB')
      expect(formatFileSize(1048576)).toBe('1 MB')
      expect(formatFileSize(1073741824)).toBe('1 GB')
      expect(formatFileSize(1536)).toBe('1.5 KB')
      expect(formatFileSize(2048000)).toBe('1.95 MB')
    })

    it('handles small byte values', () => {
      expect(formatFileSize(100)).toBe('100 Bytes')
      expect(formatFileSize(512)).toBe('512 Bytes')
    })

    it('handles large values', () => {
      expect(formatFileSize(1099511627776)).toBe('1 TB')
    })
  })

  describe('isValidUrl', () => {
    it('returns true for valid URLs', () => {
      expect(isValidUrl('https://example.com')).toBe(true)
      expect(isValidUrl('http://example.com')).toBe(true)
      expect(isValidUrl('https://www.example.com/path')).toBe(true)
      expect(isValidUrl('ftp://files.example.com')).toBe(true)
    })

    it('returns false for invalid URLs', () => {
      expect(isValidUrl('not-a-url')).toBe(false)
      expect(isValidUrl('example.com')).toBe(false)
      expect(isValidUrl('')).toBe(false)
      expect(isValidUrl('http://')).toBe(false)
    })

    it('handles edge cases', () => {
      expect(isValidUrl('javascript:alert(1)')).toBe(true) // Valid URL scheme
      expect(isValidUrl('mailto:test@example.com')).toBe(true)
    })
  })

  describe('generateId', () => {
    it('generates ID with default length', () => {
      const id = generateId()
      expect(id).toHaveLength(8)
      expect(typeof id).toBe('string')
    })

    it('generates ID with custom length', () => {
      expect(generateId(4)).toHaveLength(4)
      expect(generateId(16)).toHaveLength(16)
      expect(generateId(0)).toHaveLength(0)
    })

    it('generates unique IDs', () => {
      const id1 = generateId()
      const id2 = generateId()
      expect(id1).not.toBe(id2)
    })

    it('uses only valid characters', () => {
      const id = generateId(100)
      const validChars = /^[A-Za-z0-9]+$/
      expect(validChars.test(id)).toBe(true)
    })
  })

  describe('debounce', () => {
    it('delays function execution', async () => {
      const mockFn = vi.fn()
      const debouncedFn = debounce(mockFn, 100)

      debouncedFn()
      expect(mockFn).not.toHaveBeenCalled()

      await new Promise(resolve => setTimeout(resolve, 150))
      expect(mockFn).toHaveBeenCalledTimes(1)
    })

    it('cancels previous calls', async () => {
      const mockFn = vi.fn()
      const debouncedFn = debounce(mockFn, 100)

      debouncedFn()
      debouncedFn()
      debouncedFn()

      await new Promise(resolve => setTimeout(resolve, 150))
      expect(mockFn).toHaveBeenCalledTimes(1)
    })

    it('passes arguments correctly', async () => {
      const mockFn = vi.fn()
      const debouncedFn = debounce(mockFn, 50)

      debouncedFn('arg1', 'arg2')

      await new Promise(resolve => setTimeout(resolve, 100))
      expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2')
    })
  })
})