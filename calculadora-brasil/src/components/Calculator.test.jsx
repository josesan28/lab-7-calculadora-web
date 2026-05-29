import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import Calculator from './Calculator'

const clickBtn = async (user, label) => {
  const btns = screen.getAllByRole('button', { name: label })
  await user.click(btns[0])
}

describe('Calculator component', () => {
  it('muestra 0 al inicio', () => {
    render(<Calculator />)
    expect(screen.getAllByText('0').length).toBeGreaterThan(0)
  })

  it('muestra número al presionar botón numérico', async () => {
    const user = userEvent.setup()
    render(<Calculator />)
    await clickBtn(user, '5')
    const display = document.querySelector('[class*="value"]')
    expect(display.textContent).toBe('5')
  })

  it('suma dos números y muestra resultado al presionar igual', async () => {
    const user = userEvent.setup()
    render(<Calculator />)
    await clickBtn(user, '8')
    await clickBtn(user, '+')
    await clickBtn(user, '4')
    await clickBtn(user, '=')
    const display = document.querySelector('[class*="value"]')
    expect(display.textContent).toBe('12')
  })

  it('muestra ERROR para resta con resultado negativo', async () => {
    const user = userEvent.setup()
    render(<Calculator />)
    await clickBtn(user, '2')
    await clickBtn(user, '-')
    await clickBtn(user, '9')
    await clickBtn(user, '=')
    const display = document.querySelector('[class*="value"]')
    expect(display.textContent).toBe('ERROR')
  })

  it('no permite más de 9 dígitos en pantalla', async () => {
    const user = userEvent.setup()
    render(<Calculator />)
    for (const d of ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']) {
      await clickBtn(user, d)
    }
    const display = document.querySelector('[class*="value"]')
    expect(display.textContent).toBe('123456789')
  })
})
