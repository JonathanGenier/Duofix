/*==MODULES===================================================================*/
import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/dist/client/router'
import { useState } from 'react'

/*==COMPONENTS================================================================*/
import Info from '../../duofix.json'

/*==STYLES====================================================================*/
import styles from '../../styles/components/navbar/compact.module.css'

/*============================================================================*/

export default function mobileNavbar() {

    let router = useRouter()
    let { t } = useTranslation()

    const [menu, setMenu] = useState({
        opened: false
    });

    const languageToggler = () => {
        switch (router.locale) {
            case "fr-CA": return (
                <Link href={router.asPath} locale={'en-CA'}>
                    <div className={styles["menu-btn-d"]}>
                        <img className={styles["icon-i"]} src={"/icons/lang_icon.png"} />
                        <span className={"std-ft-md " + styles["menu-btn-d-t"]}>English</span>
                    </div>
                </Link>
            )
            default: return (
                <Link href={router.asPath} locale={'fr-CA'}>
                    <div className={styles["menu-btn-d"]}>
                        <img className={styles["icon-i"]} src={"/icons/lang_icon.png"} />
                        <span className={"std-ft-md " + styles["menu-btn-d-t"]}>Français</span>
                    </div>
                </Link>
            )
        }
    }

    const renderMenu = () => {
        if (menu.opened) {
            return (
                <>
                    <div className={styles.menuBackground} />
                    <div className={styles.menuContainer}>
                        <div className={styles.menuTopContainer}>
                            <div className={styles["icon-c"]}>
                                <img className={styles["icon-i"]} src={"/icons/location_icon.png"} />
                                <span className={"std-ft-sm " + styles["icon-t"]}>{t("common:serviceAreaCompact")}</span>
                            </div>

                            <div className={styles["icon-c"]}>
                                <img className={styles["icon-i"]} src={"/icons/email_icon.png"} />
                                <span className={"std-ft-sm " + styles["icon-t"]}>{Info.email}</span>
                            </div>

                            <div className={styles["icon-c"]}>
                                <img className={styles["icon-i"]} src={"/icons/phone_02_icon.png"} />
                                <span className={"std-ft-sm " + styles["icon-t"]}>{Info.phone}</span>
                            </div>

                            {languageToggler()}
                        </div>
                        <div className={styles.menuMiddleContainer}>
                            <a className={styles.menuBtn} href={"/"}>
                                <span className={"std-ft-md " + styles.menuBtnText}>{t('common:home')}</span>
                            </a>
                            <a className={styles.menuBtn}>
                                <span className={"std-ft-md " + styles.menuBtnText}>{t('common:about')}</span>
                            </a>
                            <a className={styles.menuBtn}>
                                <span className={"std-ft-md " + styles.menuBtnText}>{t('common:products')}</span>
                            </a>
                            <a className={styles.menuBtn}>
                                <span className={"std-ft-md " + styles.menuBtnText}>{t('common:gallery')}</span>
                            </a>
                            <a className={styles.menuBtn}>
                                <span className={"std-ft-md " + styles.menuBtnText}>{t('common:contact')}</span>
                            </a>
                            <a className={styles.menuBtnPromo} href={"/quote"}>
                                <span className={"std-ft-md " + styles.menuBtnPromoText}>{t('common:quote')}</span>
                            </a>
                        </div>

                        <div className={styles.menuBottomContainer}>
                            
                        </div>
                    </div>
                </>
            )
        }
    }

    return (
        <div className={"main-c " + styles.container}>
            <div className={"exp-c " + styles.topContainer}>
                <div className={"res-c " + styles.topContent}>
                    <img className={styles.logo} src='/images/navbar_logo.png'></img>
                    <div onClick={() => setMenu({ ...menu, opened: !menu.opened })} className={styles["menu-tgl-btn-" + menu.opened]} />
                </div>
            </div>

            {renderMenu()}
        </div>
    )
}