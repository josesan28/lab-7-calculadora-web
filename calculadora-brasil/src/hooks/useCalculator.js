import { useState } from 'react'

const MAX_DIGITS = 9
const MAX_VALUE = 999999999
const OPS = ['+', '-', '*', '/', '%']

const truncateResult = (num) => {
  if (String(num).replace('-', '').replace('.', '').length <= MAX_DIGITS) return String(num)
  const str = num.toPrecision(MAX_DIGITS)
  return String(parseFloat(str))
}

const applyOp = (a, op, b) => {
  if (op === '+') return a + b
  if (op === '-') return a - b
  if (op === '*') return a * b
  if (op === '/') return b === 0 ? null : a / b
  if (op === '%') return b === 0 ? null : a % b
  return b
}

const validate = (num) => {
  if (num === null || isNaN(num)) return 'ERROR'
  if (num < 0) return 'ERROR'
  if (num > MAX_VALUE) return 'ERROR'
  return truncateResult(num)
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
    const digits = current.replace('-', '').replace('.', '').length
    if (digits >= MAX_DIGITS && digit !== '.') return
    const next = current === '' || current === '0' ? digit : current + digit
    setDisplay(next)
    setFresh(false)
  }

  const handleOp = (nextOp) => {
    if (display === 'ERROR') return
    const current = parseFloat(display)
    if (pending !== null && !fresh) {
      const result = applyOp(pending, op, current)
      const validated = validate(result)
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
    const validated = validate(result)
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
      if (next.replace('.', '').length <= MAX_DIGITS + 1) setDisplay(next)
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