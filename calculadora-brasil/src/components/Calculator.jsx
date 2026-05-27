import Display from './Display'
import Keyboard from './Keyboard'
import styles from './Calculator.module.css'

const Calculator = () => {
  return (
    <div className={styles.calculator}>
      <div className={styles.flag} aria-hidden="true" />
      <Display value={display} activeOp={op} />
      <Keyboard onKey={handleKey} />
    </div>
  )
}

export default Calculator