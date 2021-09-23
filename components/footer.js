/*==MODULES===================================================================*/

/*==COMPONENTS================================================================*/
import { Container, Col, Row } from 'react-bootstrap'

/*==STYLES====================================================================*/
import styles from '../styles/components/footer.module.css'

/*============================================================================*/

export default function footer() {


  return (
    <Container fluid className={"Container"}>
      <h1>Footer</h1>
        {/*<div className={styles.logoContainer}>
          <img className={styles.logo} src='/images/logo_02.png'></img>
          <h1>Test</h1>
  </div>*/}
    </Container>
  )
}