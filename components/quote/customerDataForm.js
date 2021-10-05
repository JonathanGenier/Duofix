/*==MODULES===================================================================*/
import { useState, useEffect } from 'react'
import { geocodeByAddress } from 'react-places-autocomplete'
import useTranslation from 'next-translate/useTranslation'

/*==COMPONENTS================================================================*/
import Checkbox from '../checkbox'
import FormInputWrapper from '../formInputWrapper'
import AddressInput from '../addressInput'

/*==STYLES====================================================================*/
import styles from '../../styles/components/quote/customerDataForm.module.css'

/*============================================================================*/

export default function customerDataForm({ backFn, nextFn }) {

    let { t } = useTranslation('quote')

    const [tempAddress, setTempAddress] = useState("")

    // Stores all the customer's information
    const [customerData, setCustomerData] = useState({
        fullName: "",
        phone: "",
        email: "",
        address: "",
        postalCode: "",
        province: "",
        city: "",
        district: "",
        preferedLanguage: []
    })

    // Warning states (true or false). If true, we display a warning message for the assigned input.
    const [warnings, setWarnings] = useState({
        fullName: false,
        phone: false,
        phoneFormat: false,
        email: false,
        emailFormat: false,
        address: false,
        addressFormat: false,
        preferedLanguage: false
    })

    // Called when tempAddress is modified.
    useEffect(() => {

        // Reset warnings when modified
        if (tempAddress) {
            setWarnings({ ...warnings, address: false, addressFormat: false })
        } else {
            setWarnings({ ...warnings, addressFormat: false })
        }
    },
        [tempAddress])

    // This function serve to proceed to the next step of the quote application.
    // customerData.address is the last attribute to be set. This function verifies
    // customerData.address has been registered correctly before moving on.
    useEffect(() => {

        // customerData.address is null until tempAddress has been validated.
        // customerData.address is generated once by geocodeByAddress with tempAddress.
        if (customerData.address) {
            nextFn(customerData)
        }
    },
        [customerData])

    // Saves everything the user's entered and we go back into
    // the previous step of the quote application form.
    // Called by the back button
    const back = () => {

        // Saves data
        backFn()
    }

    // Validate entries and fetch the full address from geocode.
    // If all the data is valid, we proceed onto the next step of
    // the quote application form.
    // Called by the next button
    const next = async () => {

        if (!validateEntries())
            return;

        await getFullAddress()
    }

    // Gets the full address from geocode API.
    const getFullAddress = async () => {

        // At this point, tempAddress is always going to be in the following
        // format: civic number street, city, province, canada. We validate 
        // that format in the validateEntries(). 
        const fullAddress = await geocodeByAddress(tempAddress)
        let components = fullAddress[0].address_components

        setCustomerData({
            ...customerData,
            address: (components[0].long_name + " " + components[1].long_name),
            postalCode: (components.length == 8 ? components[7].long_name : components[6].long_name),
            province: (components.length == 8 ? components[5].long_name : components[4].long_name),
            city: (components.length == 8 ? components[3].long_name : components[2].long_name),
            district: (components.length == 8 ? components[2].long_name : "")
        })
    }

    // Verifies data entered by the user (Empty fields; phone, email and address formats)
    const validateEntries = () => {

        // Phone regex: (123)456-7890 or 123-456-7890 or 1234567890
        // Email regex: example@email.com
        // Address regex: 1 example street, Ottawa, ON, Canada (Given by Google Places API)
        let phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
        let emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        let addressRegex = /^[0-9]{1,5} [A-Za-z -]+, [A-Za-z]+, [A-Z]{2}, Canada$/

        // Those are set to true if there is an error
        let fullName = !customerData.fullName
        let phone = !customerData.phone
        let email = !customerData.email
        let address = !tempAddress
        let phoneFormat = (customerData.phone ? !phoneRegex.test(customerData.phone) : false)
        let emailFormat = (customerData.email ? !emailRegex.test(customerData.email) : false)
        let addressFormat = (tempAddress ? !addressRegex.test(tempAddress) : false)
        let preferedLanguage = (customerData.preferedLanguage.length == 0 ? true : false)

        setWarnings({ ...warnings, fullName, phone, email, address, phoneFormat, emailFormat, addressFormat, preferedLanguage })

        // Returns true if every entries are valid.
        return (!fullName && !phone && !email && !address && !phoneFormat && !emailFormat && !addressFormat && !preferedLanguage)
    }

    // Handles onChange of every input except for the address.
    const handleOnChange = e => {
        const { id, value } = e.target

        // Resets warnings when the user is typing
        if (value && warnings[id])
            setWarnings({ ...warnings, [id]: false })

        setCustomerData({ ...customerData, [id]: value })
    }

    // This function is a callback for checkbox components. It adds 
    // or remove selected languages to customerData.preferedLanguage 
    // array based on the checkboxes values.
    const handleCheckBox = ({ value, state }) => {
        let preferedLanguage = customerData.preferedLanguage
        let index = preferedLanguage.indexOf(value)

        // Resets warnings when the user has selected a language
        if (value && warnings.preferedLanguage)
            setWarnings({ ...warnings, preferedLanguage: false })

        // Adds language
        if (index == -1 && state) {
            preferedLanguage.push(value)
        }

        // Removes Language
        if (index != -1 && !state) {
            preferedLanguage.splice(index, 1)
        }

        setCustomerData({ ...customerData, preferedLanguage })
    }

    const getWarnings = (id) => {
    } 

    return (
        <div className={styles.formContainer}>
            <h1>{t('h1Title')}</h1>
            <hr />

            {/* Full Name */}
            <FormInputWrapper
                title={t('fullName')}
                id="Full name"
                component={
                    <input id="fullName" type="text" className={styles.textInput} onChange={handleOnChange} defaultValue={customerData.fullName}></input>
                }
                warningStates={[warnings.fullName]}
                warningMessages={[t('quote:fullNameWarnings')]}
            />

            {/* Phone */}
            <FormInputWrapper
                title={t('phone')}
                id="Phone"
                component={
                    <input id="phone" type="phone" className={styles.textInput} onChange={handleOnChange} defaultValue={customerData.phone}></input>
                }
                inputId="phone"
                onChangeFn={handleOnChange}
                defaultValue={customerData.phone}
                warningCount={2}
                warningStates={[warnings.phone, warnings.phoneFormat]}
                warningMessages={t("phoneWarnings", null, {returnObjects: true})}
            />

            {/* Email */}
            <FormInputWrapper
                title={t('email')}
                id="Email"
                component={
                    <input id="email" type="text" className={styles.textInput} onChange={handleOnChange} defaultValue={customerData.email}></input>
                }
                warningStates={[warnings.email, warnings.emailFormat]}
                warningMessages={t("emailWarnings", null, {returnObjects: true})}
            />

            {/* Address */}
            <FormInputWrapper
                title={t('address')}
                id="Address"
                component={
                    <AddressInput onChangeFn={value => setTempAddress(value)} />
                }
                warningStates={[warnings.address, warnings.addressFormat]}
                warningMessages={t("addressWarnings", null, {returnObjects: true})}
            />

            {/* Prefered Language */}
            <hr />
            <FormInputWrapper
                title={t('preferedLanguage')}
                id="Prefered Language"
                component={
                    <>
                        <Checkbox id="french" name="french" value="french" text={t('checkboxFrench')} callbackFn={handleCheckBox} />
                        <Checkbox id="english" name="english" value="english" text={t('checkboxEnglish')} callbackFn={handleCheckBox} />
                    </>
                }
                warningStates={[warnings.preferedLanguage]}
                warningMessages={t("preferedLanguageWarnings", null, {returnObjects: true})}
            />

            {/* Navigation Buttons */}
            <hr />
            <div className={styles.navBtnsContainer}>
                <button className={styles.navBtn} onClick={back}>{t('previous')}</button>
                <button className={styles.navBtn} onClick={next}>{t('next')}</button>
            </div>
        </div>
    )
}