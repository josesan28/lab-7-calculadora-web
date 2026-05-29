import { useState } from 'react'

const MAX_VISIBLE_CHARS = 9
const MAX_VALUE = 999999999
const OPS = ['+', '-', '*', '/', '%']

const formatResult = (value) => {
  if (value === null || Number.isNaN(value) || !Number.isFinite(value)) return 'ERROR'
  if (value < 0 || value > MAX_VALUE) return 'ERROR'
  if (Number.isInteger(value)) return String(value)

  const integerLength = String(Math.trunc(value)).length
  const decimals = MAX_VISIBLE_CHARS - integerLength - 1

  if (decimals <= 0) {
    const rounded = String(Math.round(value))
    return rounded.length <= MAX_VISIBLE_CHARS ? rounded : 'ERROR'
  }

  return value
    .toFixed(decimals)
    .replace(/\.?0+$/, '')
}

const applyOp = (a, op, b) => {
  if (op === '+') return a + b
  if (op === '-') return a - b
  if (op === '*') return a * b
  if (op === '/') return b === 0 ? null : a / b
  if (op === '%') return b === 0 ? null : a % b
  return b
}

export const useCalculator = () => {
  const [display, setDisplay] = useState('0')
  const [pending, setPending] = useState(null)
  const [op, setOp] = useState(null)
  const [fresh, setFresh] = useState(true)

  const handleDigit = (digit) => {
    if (display === 'ERROR') return
    const current = fresh ? '' : display
    if (digit === '.' && current.includes('.')) return

    let next = current
    if (digit === '.') {
      if (next === '' || next === '-') next = `${next}0`
      next += '.'
    } else if (next === '' || next === '0' || next === '-0') {
      next = next.startsWith('-') ? `-${digit}` : digit
    } else {
      next += digit
    }

    if (next.length > MAX_VISIBLE_CHARS) return
    setDisplay(next)
    setFresh(false)
  }

  const handleOp = (nextOp) => {
    if (display === 'ERROR') return
    const current = parseFloat(display)
    if (pending !== null && !fresh) {
      const result = applyOp(pending, op, current)
      const validated = formatResult(result)
      setDisplay(validated)
      setPending(validated === 'ERROR' ? null : result)
    } else {
      setPending(current)
    }
    setOp(nextOp)
    setFresh(true)
  }

  const handleEquals = () => {
    if (pending === null || display === 'ERROR') return
    const current = parseFloat(display)
    const result = applyOp(pending, op, current)
    const validated = formatResult(result)
    setDisplay(validated)
    setPending(null)
    setOp(null)
    setFresh(true)
  }

  const handleToggleSign = () => {
    if (display === 'ERROR' || display === '0') return
    const num = parseFloat(display)
    if (num > 0) {
      const next = '-' + display
      if (next.length <= MAX_VISIBLE_CHARS) setDisplay(next)
    } else {
      setDisplay(display.replace('-', ''))
    }
  }

  const handleClear = () => {
    setDisplay('0')
    setPending(null)
    setOp(null)
    setFresh(true)
  }

  const handleKey = (key) => {
    if (key === 'C') return handleClear()
    if (key === '=') return handleEquals()
    if (key === '+/-') return handleToggleSign()
    if (OPS.includes(key)) return handleOp(key)
    handleDigit(key)
  }

  return { display, op, handleKey }
}