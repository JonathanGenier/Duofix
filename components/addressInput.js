/*==MODULES===================================================================*/
import { useState, useEffect } from 'react'
import PlacesAutocomplete from 'react-places-autocomplete'
import useTranslation from 'next-translate/useTranslation'

/*==COMPONENTS================================================================*/

/*==STYLES====================================================================*/
import styles from '../styles/components/addressInput.module.css'

/*============================================================================*/

export default function addressInput({ onChangeFn }) {

    let { t } = useTranslation()

    const [tempAddress, setTempAddress] = useState("")

    // Restricts address search to Canada only.
    const searchOptions = {
        componentRestrictions: {
            country: 'ca',
        },
        types: ['address']
    }

    // This function is called when onChange/onSelect on address is triggered
    useEffect(() => {

        onChangeFn(tempAddress)
    },
        [tempAddress])

    return (
        <PlacesAutocomplete
            value={tempAddress}
            onChange={setTempAddress}
            onSelect={setTempAddress}
            searchOptions={searchOptions}
        >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div key={suggestions.description}>

                    <input
                        {...getInputProps({
                            placeholder: t('quote:addressPlaceHolder')
                        })}
                        className={styles.textInput}
                        type="text"
                    />
                    <div className="autocomplete-dropdown-container">
                        {loading && <div>Loading...</div>}
                        {suggestions.map(suggestion => {
                            const className = suggestion.active
                                ? 'suggestion-item--active'
                                : 'suggestion-item';
                            const style = suggestion.active
                                ? { backgroundColor: '#c25c0e77', cursor: 'pointer' }
                                : { backgroundColor: '#ffffff', cursor: 'pointer' };
                            return (
                                <div
                                    className={styles.dropdownContainer}
                                    key={suggestions.indexOf(suggestion)}
                                    {...getSuggestionItemProps(suggestion, {
                                        className,
                                        style,
                                    })}
                                >
                                    <span>{suggestion.description}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </PlacesAutocomplete>
    )
}