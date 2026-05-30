import CalcButton from '../components/CalcButton'

export default {
  title: 'Calculadora/CalcButton',
  component: CalcButton,
  parameters: { backgrounds: { default: 'brasil' } },
  decorators: [
    (Story) => (
      <div style={{ width: '92px' }}>
        <Story />
      </div>
    ),
  ],
  args: { onClick: (label) => console.log('pressed:', label) },
}

export const Numero = { args: { label: '7', variant: 'default' } }

export const Operacion = { args: { label: '+', variant: 'op' } }

export const Igual = { args: { label: '=', variant: 'equals' } }

export const Limpiar = { args: { label: 'C', variant: 'clear' } }

export const Funcion = { args: { label: '+/-', variant: 'fn' } }