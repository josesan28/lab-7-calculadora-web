import Display from '../components/Display'

export default {
  title: 'Calculadora/Display',
  component: Display,
  parameters: { backgrounds: { default: 'brasil' } },
}

export const Normal = { args: { value: '123', activeOp: null } }

export const Operacion = { args: { value: '456', activeOp: '+' } }

export const Error = { args: { value: 'ERROR', activeOp: null } }

export const NumeroGrande = { args: { value: '999999999', activeOp: '*' } }

export const Decimal = { args: { value: '3.1415926', activeOp: null } }