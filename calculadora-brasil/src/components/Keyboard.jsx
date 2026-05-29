import CalcButton from './CalcButton'
import styles from './Keyboard.module.css'
const R=[
  [['C','clear'],['+/-','fn'],['%','op'],['/','op']],
  [['7'],['8'],['9'],['*','op']],
  [['4'],['5'],['6'],['-','op']],
  [['1'],['2'],['3'],['+','op']],
  [['0','zero'],['.','dot'],['=','equals']],
]
const Keyboard=({onKey})=>(
  <div className={styles.keyboard} role='group' aria-label='Teclado de la calculadora'>
    {R.map((row,i)=>(
      <div key={i} className={styles.row}>
        {row.map(([l,v])=><CalcButton key={l} label={l} variant={v||'default'} onClick={onKey}/>)}
      </div>
    ))}
  </div>
)
export default Keyboard