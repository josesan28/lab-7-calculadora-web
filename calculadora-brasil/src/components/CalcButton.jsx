import styles from './CalcButton.module.css'

const CalcButton = ({ label, variant = 'default', onClick }) => (
  <button
    className={`${styles.btn} ${styles[variant]}`}
    onClick={() => onClick(label)}
    aria-label={label}
  >
    {label}
  </button>
)

export default CalcButton