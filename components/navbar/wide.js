/*==MODULES===================================================================*/
import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/dist/client/router'

/*==COMPONENTS================================================================*/
import Info from '../../duofix.json'
import NavButton from './navButton'

/*==STYLES====================================================================*/
import styles from '../../styles/components/navbar/wide.module.css'

/*============================================================================*/

export default function wideNavbar() {

    let router = useRouter()
    let { t } = useTranslation()

    const languageToggler = () => {
        switch (router.locale) {
            case "fr-CA": return (
                <Link href={router.asPath} locale={'en-CA'}>
                    <a className={styles.languageItemText + " std-ft-sm "}>English</a>
                </Link>
            )
            default: return (
                <Link href={router.asPath} locale={'fr-CA'}>
                    <a className={styles.languageItemText + " std-ft-sm "}>Français</a>
                </Link>
            )
        }
    }

    return (
        <div className={"main-c " + styles.container}>
            <div className={"exp-c " + styles.topContainer}>
                <div className={"res-c " + styles.topContent}>
                    <div className={styles.itemContainerLeft}>
                        <img className={styles.iconImage} src={"/icons/location_icon.png"} />
                        <span className={"std-ft-xs " + styles.topItemText}>{t("common:serviceArea")}</span>
                    </div>

                    <div className={styles.itemContainerLeft}>
                        <img className={styles.iconImage} src={"/icons/email_icon.png"} />
                        <span className={"std-ft-xs " + styles.topItemText}>{Info.email}</span>
                    </div>

                    <div className={styles.itemContainerLeft}>
                        <img className={styles.iconImage} src={"/icons/phone_02_icon.png"} />
                        <span className={"std-ft-xs " + styles.topItemText}>{Info.phone}</span>
                    </div>

                    <div className={styles.itemContainerRight}>
                        <img className={styles.iconImage} src={"/icons/lang_icon.png"} />
                        {languageToggler()}
                    </div>
                </div>
            </div>

            <div className={"exp-c " + styles.bottomContainer}>
                <div className={"res-c " + styles.bottomContent}>
                    <Link href={router.locale + "/"}>
                        <a>
                            <img className={styles.logo} src='/images/navbar_logo.png' onClick={() => { router.push("/") }}></img>
                        </a>
                    </Link>

                    <div className={styles.navbar}>
                        <div className={styles.itemContainerLeft}>
                            <NavButton text={t('common:home')} type="wide" />
                            <NavButton text={t('common:about')} type="wide" route="about" />
                            <NavButton text={t('common:products')} type="wide" route="products" />
                            <NavButton text={t('common:gallery')} type="wide" route="gallery" />
                            <NavButton text={t('common:contact')} type="wide" route="contact" />
                        </div>

                        <div className={styles.itemContainerRight}>
                            <NavButton text={t('common:quote')} type="wide" promo={true} route="quote" font="std-ft-lg" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
