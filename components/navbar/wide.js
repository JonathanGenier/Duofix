/*==MODULES===================================================================*/
import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/dist/client/router'

/*==COMPONENTS================================================================*/
import Info from '../../duofix.json'

/*==STYLES====================================================================*/
import styles from '../../styles/components/navbar/wide.module.css'

/*============================================================================*/

export default function desktopNavbar() {

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
                    <img className={styles.logo} src='/images/navbar_logo.png' onClick={() => { router.push("/") }}></img>
                    <div className={styles.navbar}>
                        <div className={styles.itemContainerLeft}>
                            <Link href={router.locale + "/"}>
                                <a className={styles.bottomItemText + " std-ft-md"} href="/">{t('common:home')}</a>
                            </Link>
                            <Link href={router.locale + "/about"}>
                                <a className={styles.bottomItemText + " std-ft-md"} href="/about">{t('common:about')}</a>
                            </Link>
                            <Link href={router.locale + "/products"}>
                                <a className={styles.bottomItemText + " std-ft-md"} href="/products">{t('common:products')}</a>
                            </Link>
                            <Link href={router.locale + "/gallery"}>
                                <a className={styles.bottomItemText + " std-ft-md"} href="/gallery">{t('common:gallery')}</a>
                            </Link>
                            <Link href={router.locale + "/contact"}>
                                <a className={styles.bottomItemText + " std-ft-md"} href="/contact">{t('common:contact')}</a>
                            </Link>
                        </div>

                        <div className={styles.itemContainerRight}>
                            <Link href={router.locale + "/quote"}>
                                <a className={styles.quoteItemText + " std-ft-lg "} >{t('common:quote')}</a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
