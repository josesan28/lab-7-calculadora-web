import { renderHook, act } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { useCalculator } from './useCalculator'

describe('useCalculator', () => {
  const press = (result, ...keys) => {
    keys.forEach(k => act(() => result.current.handleKey(k)))
  }

  it('concatena dígitos en el display', () => {
    const { result } = renderHook(() => useCalculator())
    press(result, '1', '2', '3')
    expect(result.current.display).toBe('123')
  })

  it('limpia el display al presionar un dígito después de operación', () => {
    const { result } = renderHook(() => useCalculator())
    press(result, '5', '+', '3')
    expect(result.current.display).toBe('3')
  })

  it('muestra resultado acumulado al presionar operación consecutiva', () => {
    const { result } = renderHook(() => useCalculator())
    press(result, '2', '0', '+', '5', '+')
    expect(result.current.display).toBe('25')
  })

  it('muestra ERROR si el resultado es negativo', () => {
    const { result } = renderHook(() => useCalculator())
    press(result, '3', '-', '9', '=')
    expect(result.current.display).toBe('ERROR')
  })

  it('muestra ERROR si el resultado supera 999999999', () => {
    const { result } = renderHook(() => useCalculator())
    press(result, '9', '9', '9', '9', '9', '9', '9', '9', '9', '+', '1', '=')
    expect(result.current.display).toBe('ERROR')
  })

  it('ignora dígitos después del noveno carácter', () => {
    const { result } = renderHook(() => useCalculator())
    press(result, '1', '2', '3', '4', '5', '6', '7', '8', '9', '0')
    expect(result.current.display).toBe('123456789')
  })

  it('realiza multiplicación correctamente', () => {
    const { result } = renderHook(() => useCalculator())
    press(result, '7', '*', '8', '=')
    expect(result.current.display).toBe('56')
  })

  it('realiza división y trunca decimales a 9 caracteres', () => {
    const { result } = renderHook(() => useCalculator())
    press(result, '2', '2', '/', '7', '=')
    const display = result.current.display
    expect(display.replace('.', '').length).toBeLessThanOrEqual(9)
    expect(parseFloat(display)).toBeCloseTo(22 / 7, 5)
  })

  it('módulo funciona correctamente', () => {
    const { result } = renderHook(() => useCalculator())
    press(result, '1', '0', '%', '3', '=')
    expect(result.current.display).toBe('1')
  })

  it('+/- convierte positivo a negativo y regresa', () => {
    const { result } = renderHook(() => useCalculator())
    press(result, '5')
    act(() => result.current.handleKey('+/-'))
    expect(result.current.display).toBe('-5')
    act(() => result.current.handleKey('+/-'))
    expect(result.current.display).toBe('5')
  })

  it('C resetea el estado completamente', () => {
    const { result } = renderHook(() => useCalculator())
    press(result, '9', '9', '+', '1', 'C')
    expect(result.current.display).toBe('0')
    expect(result.current.op).toBeNull()
  })

  it('permite ingresar punto decimal solo una vez por número', () => {
    const { result } = renderHook(() => useCalculator())
    press(result, '3', '.', '1', '.', '4')
    expect(result.current.display).toBe('3.14')
  })
})