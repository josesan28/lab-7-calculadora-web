import Display from './Display'
import Keyboard from './Keyboard'
import { useCalculator } from '../hooks/useCalculator'
import styles from './Calculator.module.css'

const Calculator = () => {
  const { display, op, handleKey } = useCalculator()
  return (
    <div className={styles.calculator}>
      <div className={styles.flag} aria-hidden="true" />
      <Display value={display} activeOp={op} />
      <Keyboard onKey={handleKey} />
    </div>
  )
}

export default Calculator