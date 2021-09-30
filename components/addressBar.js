/*==MODULES===================================================================*/
import { useState } from 'react'

/*==COMPONENTS================================================================*/
import { Container, Col, Row } from 'react-bootstrap'
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete'

/*==STYLES====================================================================*/

/*============================================================================*/

export default function addressBar() {

    const [address, setAddress] = useState("")

    const handleSelect = async value => {
        const results = await geocodeByAddress(value)
        console.log(results)
        setAddress(results)
    }

    return (
        <PlacesAutocomplete
            value={address}
            onChange={setAddress}
            onSelect={handleSelect}
        >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div key={suggestions.description}>

                    <input
                        {...getInputProps({
                            placeholder: 'Enter your address ...',
                            className: 'location-search-input',
                        })}
                    />
                    <div className="autocomplete-dropdown-container">
                        {loading && <div>Loading...</div>}
                        {suggestions.map(suggestion => {
                            const className = suggestion.active
                                ? 'suggestion-item--active'
                                : 'suggestion-item';
                            // inline style for demonstration purpose
                            const style = suggestion.active
                                ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                : { backgroundColor: '#ffffff', cursor: 'pointer' };
                            return (
                                <div
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