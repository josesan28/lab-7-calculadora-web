import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import Calculator from './Calculator'

const clickBtn = async (user, label) => {
  await user.click(screen.getAllByRole('button', { name: label })[0])
}

describe('Componente Calculator', () => {
  it('muestra 0 en el primer renderizado', () => {
    render(<Calculator />)
    expect(screen.getByRole('status')).toHaveTextContent('0')
  })

  it('muestra el dígito presionado en la pantalla', async () => {
    const user = userEvent.setup()
    render(<Calculator />)
    await clickBtn(user, '5')
    expect(screen.getByRole('status')).toHaveTextContent('5')
  })

  it('suma dos números y muestra el resultado al presionar igual', async () => {
    const user = userEvent.setup()
    render(<Calculator />)
    await clickBtn(user, '8')
    await clickBtn(user, '+')
    await clickBtn(user, '4')
    await clickBtn(user, '=')
    expect(screen.getByRole('status')).toHaveTextContent('12')
  })

  it('muestra ERROR para un resultado negativo de la resta', async () => {
    const user = userEvent.setup()
    render(<Calculator />)
    await clickBtn(user, '2')
    await clickBtn(user, '-')
    await clickBtn(user, '9')
    await clickBtn(user, '=')
    expect(screen.getByRole('status')).toHaveTextContent('ERROR')
  })

  it('mantiene la pantalla limitada a 9 caracteres visibles', async () => {
    const user = userEvent.setup()
    render(<Calculator />)
    for (const digit of ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']) {
      await clickBtn(user, digit)
    }
    expect(screen.getByRole('status')).toHaveTextContent('123456789')
  })
})
