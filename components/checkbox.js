/*==MODULES===================================================================*/

/*==COMPONENTS================================================================*/
import { Container, Col, Row } from 'react-bootstrap'

/*==STYLES====================================================================*/
import styles from '../styles/components/checkbox.module.css'

/*============================================================================*/

export default function checkbox({id, name, value, text}) {
  
  return (
    <div className={styles.container}>
        <input className={styles.input} type="checkbox" id={id} name={name} value={value}></input>
        <span className={styles.text}>{text}</span>
    </div>
  )
}