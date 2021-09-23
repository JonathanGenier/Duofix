/*==MODULES===================================================================*/
import useTranslation from 'next-translate/useTranslation'

/*==COMPONENTS================================================================*/
import { Container, Row, Col } from 'react-bootstrap'

/*==STYLES====================================================================*/
import styles from '../styles/pages/index.module.css'

/*============================================================================*/

export default function index() {
  let { t } = useTranslation()

  return (
    <div className={"main-c " + styles.container}>
      <div className={"exp-c " + styles.topContainer}>
        <div className={"res-c " + styles.topContent}>
          <div className={styles.logoContent}>
            <img className={styles.logo} src='/images/logo_01.png'></img>
            <h3 className={styles.experienceAd}>{t("common:experienceAd")}</h3>
          </div>
        </div>
      </div>
      <div className={"exp-c " + styles.middleContainer}>
        <div className={"res-c " + styles.middleContent}>
          
        </div>
      </div>
    </div>
  )
}
