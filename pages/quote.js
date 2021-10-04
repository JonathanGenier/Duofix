/*==MODULES===================================================================*/
import useTranslation from 'next-translate/useTranslation'
import { useState, useLayoutEffect, useEffect } from 'react'
import axios from 'axios'

/*==COMPONENTS================================================================*/
import { Container, Row, Col } from 'react-bootstrap'
import Checkbox from '../components/checkbox'
import CustomerDataForm from '../components/quote/customerDataForm'

/*==STYLES====================================================================*/
import styles from '../styles/pages/quote.module.css'

/*============================================================================*/

export default function products() {
    let { t } = useTranslation()

    const [form, setForm] = useState({
        serviceLanguage: '',
        address: "",
        district: "",
        city: "",
        province: "",
        postalCode: ""
    })

    const [step, setStep] = useState(1)

    const next = () => {
        let sum = step + 1
        setStep((sum > 5 ? 5 : sum))
    }

    const back = () => {
        console.log("OK")
        let diff = step - 1;
        setStep((diff < 1 ? 1 : diff))
    }

    const handleCustomerDataForm = (customerData) => {
        console.log(customerData)
    }

    const handleSetAddress = (fullAddress) => {
        setForm({
            ...form, 
            address: fullAddress.address, 
            district: fullAddress.district, 
            city: fullAddress.city,
            province: fullAddress.province,
            postalCode: fullAddress.postalCode
        })
    }

    const renderSteps = () => {
        switch (step) {
            case 1: return (<CustomerDataForm backFn={back} nextFn={handleCustomerDataForm}/>);
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
