/*==MODULES===================================================================*/
import { useState, useEffect } from 'react'

/*==COMPONENTS================================================================*/

/*==STYLES====================================================================*/
import styles from '../styles/components/checkbox.module.css'

/*============================================================================*/

export default function checkbox({ value, text, callbackFn }) {

    const [checked, setChecked] = useState(false)

    useEffect(() => {
        callbackFn({ value, state: checked })
    },
        [checked])

    // Adding event listener (Spacebar keyup) for keyboard accessibility
    useEffect(() => {
        let checkbox = document.getElementById(value)

        checkbox.addEventListener('keyup', event => {
            if (event.code === 'Space') {
                setChecked(!checked)
            }
        })  
    })

    return (
        <div className={styles.container} >
            <div className={styles.content} onClick={() => setChecked(!checked)}>
                <div id={value} tabIndex="0" className={styles.checkbox + " " + styles.hoverable + " " + styles["checkbox-" + checked]}>
                    {checked ? <span className={styles.checkmark}>✖</span> : <></>}
                </div>
                <span className={styles.text + " " + styles.hoverable} >{text}</span>
            </div>
        </div>
    )
}