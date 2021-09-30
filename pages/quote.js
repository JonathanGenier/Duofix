/*==MODULES===================================================================*/
import useTranslation from 'next-translate/useTranslation'
import { useState, useLayoutEffect, useEffect } from 'react'
import axios from 'axios'

/*==COMPONENTS================================================================*/
import { Container, Row, Col } from 'react-bootstrap'
import Checkbox from '../components/checkbox'
import AddressBar from '../components/addressBar'

/*==STYLES====================================================================*/
import styles from '../styles/pages/quote.module.css'

/*============================================================================*/

export default function products() {
    let { t } = useTranslation()

    const [form, setForm] = useState({
        serviceLanguage: '',
    })

    const [step, setStep] = useState(1)

    const [autoFill, setAutoFill] = useState(
        {
            city: "",
            province: ""
        }
    )

    const nextStep = () => {
        let sum = step + 1
        setStep((sum > 5 ? 5 : sum))
    }

    const backStep = () => {
        let diff = step - 1;
        setStep((diff < 1 ? 1 : diff))
    }

    const handlePostalCodeOnBlur = async (value) => {
        console.log("ONBLUR:", value)

        let pcReg = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;

        if (!pcReg.test(value)) {
            return console.log("BAD")
        }

        let path = '/api/postalCode'
        await axios.post(path, {data: value}).then(response => {

            if (response.status !== 200) {
                return
            }

            if (!location) {
                return setWarning({ ...warning, bad_registration: true })
            }

            let city = response.data.location.city
            let province = response.data.location.province

            setAutoFill({...autoFill, city, province})

        }).catch(error => {
            console.log(error)
        })
    }

    const renderCustomerInformation = () => {
        return (
            <div className={styles.formContainer}>
                <h1>Your information</h1>
                <hr />

                <label>First Name<b>*</b></label>
                <input type="text"></input>

                <label>Last Name<b>*</b></label>
                <input type="text"></input>

                <label>Phone<b>*</b></label>
                <input type="text"></input>

                <label>E-mail<b>*</b></label>
                <input type="text"></input>

                <AddressBar/>
                {
                // <label>Address</label>
                // <input type="text"></input>

                // <label>Postal Code<b>*</b></label>
                // <input
                //     type="text"
                //     maxLength="7"
                //     onBlur={event => handlePostalCodeOnBlur(event.target.value)}>
                // </input>

                // <label>City<b>*</b></label>
                // <input type="text" defaultValue={autoFill.city}></input>

                // <label>Province<b>*</b></label>
                // <input type="text" defaultValue={autoFill.province}></input>
                }
                <hr />
                <label>Prefered Language</label>
                <Checkbox id="french" name="french" value="french" text="Français" />
                <Checkbox id="english" name="english" value="english" text="English" />

                <hr />
                <div className={styles.navBtnsContainer}>
                    <button className={styles.navBtn} onClick={() => backStep()}>Back</button>
                    <button className={styles.navBtn} onClick={() => nextStep()}>Next</button>
                </div>
            </div>
        )
    }

    const renderSteps = () => {
        switch (step) {
            case 1: return renderCustomerInformation();
        }
    }

    return (
        <div className={"main-c " + styles.container}>
            <div className={"exp-c " + styles.expandlableContainer}>
                <div className={"res-c " + styles.restrictedContainer}>
                    {renderSteps()}
                </div>
            </div>
        </div>
    )
}
