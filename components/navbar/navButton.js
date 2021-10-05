/*==MODULES===================================================================*/
import Link from 'next/link'
import { useRouter } from 'next/dist/client/router'

/*==COMPONENTS================================================================*/
/*==STYLES====================================================================*/
import styles from '../../styles/components/navbar/button.module.css'

/*============================================================================*/

const BUTTON_TYPE = Object.freeze(["compact", "wide"])

export default function navButton({ text, type, promo = false, route = " ", font = "std-ft-md", onClickCallBackFn }) {

    let router = useRouter()

    // Verifies errors made by devs.
    if (!verifyNavButton(text, type, promo, route, font)) {
        return <></>
    }

    return (
        <Link href={router.locale + "/" + route}>
            <a className={styles["button-" + type + (promo ? "-promo" : "")]} onClick={onClickCallBackFn}>
                <span className={styles["text-" + type + (promo ? "-promo" : "")] + " " + font}>{text}</span>
            </a>
        </Link>
    )
}

const verifyNavButton = (text, type, promo, route, font) => {

    // No text provided
    if (!text) {
        console.error("Navbar button: No text has been provided.")
        return false
    }

    // No type provided
    if (!type) {
        console.error("Navbar button (%s): No type has been provided.", text)
        return false
    }

    // 2 Types are only supported
    if (type !== "compact" && type !== "wide") {
        console.error("Navbar button (%s): Button type is invalid.", text)
        return false
    }

    // No route provided
    if (!route) {
        console.error("Navbar button (%s): No route has been provided.", text)
        return false
    }

    // Foward slashes are already given in the route.
    if (route[0] === '/') {
        console.error("Navbar button (%s): No foward slash is needed for the route.", text)
        return false
    }

    // Promo must be a boolean
    if (typeof (promo) !== "boolean") {
        console.error("Navbar button (%s): Promo attribute must be a boolean and/or provided.", text)
        return false
    }

    // No route provided
    if (!font) {
        console.error("Navbar button (%s): No font has been provided.", text)
        return false
    }

    return true
}