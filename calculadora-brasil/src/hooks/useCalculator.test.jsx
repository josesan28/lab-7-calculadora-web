import { renderHook, act } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { useCalculator } from './useCalculator'

const press = (result, ...keys) => {
  keys.forEach((key) => act(() => result.current.handleKey(key)))
}

describe('useCalculator', () => {
  it('concatena los dígitos presionados', () => {
    const { result } = renderHook(() => useCalculator())
    press(result, '1', '2', '3')
    expect(result.current.display).toBe('123')
  })

  it('limpia la pantalla después de una operación antes de escribir de nuevo', () => {
    const { result } = renderHook(() => useCalculator())
    press(result, '5', '+', '3')
    expect(result.current.display).toBe('3')
  })

  it('muestra resultados intermedios al encadenar operaciones', () => {
    const { result } = renderHook(() => useCalculator())
    press(result, '2', '0', '+', '5', '+')
    expect(result.current.display).toBe('25')
  })

  it('formatea los resultados de la división dentro del límite de 9 caracteres', () => {
    const { result } = renderHook(() => useCalculator())
    press(result, '2', '2', '/', '7', '=')
    expect(result.current.display).toBe('3.1428571')
  })

  it('soporta operaciones de módulo', () => {
    const { result } = renderHook(() => useCalculator())
    press(result, '1', '0', '%', '3', '=')
    expect(result.current.display).toBe('1')
  })

  it('alterna el signo con +/-', () => {
    const { result } = renderHook(() => useCalculator())
    press(result, '5')
    act(() => result.current.handleKey('+/-'))
    expect(result.current.display).toBe('-5')
    act(() => result.current.handleKey('+/-'))
    expect(result.current.display).toBe('5')
  })

  it('mantiene la entrada decimal dentro del límite de 9 caracteres', () => {
    const { result } = renderHook(() => useCalculator())
    press(result, '1', '2', '3', '4', '5', '6', '7', '8', '.', '9')
    expect(result.current.display).toBe('12345678.')
  })

  it('muestra ERROR para resultados negativos', () => {
    const { result } = renderHook(() => useCalculator())
    press(result, '3', '-', '9', '=')
    expect(result.current.display).toBe('ERROR')
  })

  it('muestra ERROR para resultados que exceden el límite de 9 caracteres', () => {
    const { result } = renderHook(() => useCalculator())
    press(result, '9', '9', '9', '9', '9', '9', '9', '9', '9', '+', '1', '=')
    expect(result.current.display).toBe('ERROR')
  })

  it('resetea todo el estado con C', () => {
    const { result } = renderHook(() => useCalculator())
    press(result, '9', '9', '+', '1', 'C')
    expect(result.current.display).toBe('0')
    expect(result.current.op).toBeNull()
  })
})