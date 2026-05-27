import styles from './Display.module.css'

const Display = ({ value, activeOp }) => (
  <div className={styles.display}>
    <span className={styles.op}>{activeOp || ''}</span>
    <span className={`${styles.value} ${value === 'ERROR' ? styles.error : ''}`}>
      {value}
    </span>
  </div>
)

export default Display