/*==MODULES===================================================================*/
import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/dist/client/router'
import { useState } from 'react'

/*==COMPONENTS================================================================*/
import Info from '../../duofix.json'
import NavButton from './navButton'

/*==STYLES====================================================================*/
import styles from '../../styles/components/navbar/compact.module.css'

/*============================================================================*/

export default function compactNavbar() {

    let router = useRouter()
    let { t } = useTranslation()

    const [menu, setMenu] = useState(false);

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
        if (menu) {
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
                            <NavButton text={t('common:quote')} type="compact" promo={true} route="quote" onClickCallBackFn={() => setMenu(false)}/>
                            <NavButton text={t('common:home')} type="compact" onClickCallBackFn={() => setMenu(false)} />
                            <NavButton text={t('common:about')} type="compact" route="about" onClickCallBackFn={() => setMenu(false)}/>
                            <NavButton text={t('common:products')} type="compact" route="products" onClickCallBackFn={() => setMenu(false)}/>
                            <NavButton text={t('common:gallery')} type="compact" route="gallery" onClickCallBackFn={() => setMenu(false)}/>
                            <NavButton text={t('common:contact')} type="compact" route="contact" onClickCallBackFn={() => setMenu(false)}/>
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
                    <div className={styles.logoContainer}>
                        <Link href={"/" + router.locale + "/"}>
                            <a>
                                <img className={styles.logo} src='/images/navbar_logo.png'></img>
                            </a>
                        </Link>
                    </div>

                    <div onClick={() => setMenu(!menu)} className={styles["menu-tgl-btn-" + menu]} />
                </div>
            </div>

            {renderMenu()}
        </div>
    )
}