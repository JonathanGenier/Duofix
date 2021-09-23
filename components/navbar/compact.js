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

                            <div className={styles["menu-btn"]}>
                                <span className={"std-ft-md " + styles["menu-btn-t"]}>{t('common:home')}</span>
                            </div>
                            <div className={styles["menu-btn"]}>
                                <span className={"std-ft-md " + styles["menu-btn-t"]}>{t('common:about')}</span>
                            </div>
                            <div className={styles["menu-btn"]}>
                                <span className={"std-ft-md " + styles["menu-btn-t"]}>{t('common:products')}</span>
                            </div>
                            <div className={styles["menu-btn"]}>
                                <span className={"std-ft-md " + styles["menu-btn-t"]}>{t('common:gallery')}</span>
                            </div>
                            <div className={styles["menu-btn"]}>
                                <span className={"std-ft-md " + styles["menu-btn-t"]}>{t('common:contact')}</span>
                            </div>
                        </div>

                        <div className={styles.menuBottomContainer}>
                            <div className={styles["menu-btn-d"]}>
                                <span className={"std-ft-lg " + styles["menu-btn-d-t-b"]}>{t('common:quote')}</span>
                            </div>
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