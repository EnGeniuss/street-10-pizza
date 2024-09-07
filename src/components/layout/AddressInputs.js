export default function AddressInputs({addressProps, setAddressProps}) {
    const {phone,
            streetAddress,
            postalCode,
            city,
            country
    } = addressProps;
    return(
        <>
            <label> Phone</label>
            <input 
                type="tel" placeholder="Phone number"
                value={phone} onChange={ev => setAddressProps('phone',ev.target.value)}
            />
            <label>Street</label>
            <input 
                type="text" placeholder="Street Address"
                value={streetAddress} onChange={ev => setAddressProps('streetAddress',ev.target.value)}
            />
            <div className="grid grid-cols-2 gap-2">
                <div>
                    <label>Postal Code</label>
                    <input
                        style={{'margin': '0'}}
                        type="text" placeholder="Postal Code"
                        value={postalCode} onChange={ev => setAddressProps('postalCode',ev.target.value)}
                    />  
                </div>
                <div>
                    <label>City</label>
                    <input
                        style={{'margin': '0'}}
                        type="text" placeholder="City"
                        value={city} onChange={ev =>setAddressProps('city',ev.target.value)}
                    />
                </div>
            </div>
            
            <label>Country</label>
            <input
                type="text" placeholder="Country"
                value={country} onChange={ev => setAddressProps('country',ev.target.value)}
            />
        </>
    )
}