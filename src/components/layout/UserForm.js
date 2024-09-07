'use client';
import { useEffect, useState } from "react";
import EditableImage from "./EditableImage";
import checkProfile from "../CheckProfile";
import toast from "react-hot-toast";
import AddressInputs from "./AddressInputs";
export default function UserForm({user, onSave}) {
    const [fName, setFName] = useState(user?.name?.split(' ')[0] || '');
    const [lName, setLName] = useState(user?.name?.split(' ')[1] || '');
    const [userName, setUserName] = useState(user?.userName || '');
    const [image, setImage] = useState(user?.image||'');
    const [phone,setPhone] = useState(user?.phone||'');
    const [streetAddress,setStreetAddress] = useState(user?.streetAddress||'');
    const [postalCode,setPostalCode] = useState(user?.postalCode||'');
    const [city,setCity] = useState(user?.city||'');
    const [country,setCountry] = useState(user?.country||'');
    const [admin, setAdmin] = useState(user?.admin || false);
    const {data:loggedInUserData} = checkProfile();
    const stateSetters = {
        phone: setPhone,
        streetAddress: setStreetAddress,
        postalCode: setPostalCode,
        city: setCity,
        country: setCountry,
        // Add more mappings as needed
    };




    function handleAddressChange(propName, value) {
        if (propName in stateSetters) {
            stateSetters[propName](value);
        }
    }
    useEffect(() => {
        const newUsername = `${fName.trim()} ${lName.trim()}`;
        setUserName(newUsername);
    }, [fName, lName]); // Only run the effect when fName or lName changes

    if (!user) {
        return <p>User data is not available.</p>; // or handle it in some other way
    }

    return(
        <div className="flex gap-2">
                    <div>
                        <div className="rounded-lg p-2 relative w-max-[120px]">
                            <EditableImage link={image} setLink={setImage}/>
                        </div>
                    </div>
                    <form 
                        className="grow" 
                        onSubmit={ev =>
                            onSave(ev, {
                                fName,
                                lName,
                                name:userName,
                                image,
                                admin,
                                phone,
                                streetAddress,
                                postalCode,
                                city,
                                country})
                    }>
                            <label>
                                Name
                            </label>
                            <div className="flex gap-2">
                                <input 
                                    type="text" placeholder="First Name"
                                    value={fName} onChange={ev => setFName(ev.target.value)}
                                />
                                <input
                                    type="text" placeholder="Last Name"
                                    value={lName} onChange={ev => setLName(ev.target.value)}
                                />
                            </div>
                        <label>
                            Email
                        </label>
                        <input 
                            type="email" 
                            disabled={true} 
                            value={user.email}
                        /> 
                        <AddressInputs 
                            addressProps={{phone, streetAddress, postalCode, city, country}}
                            setAddressProps={handleAddressChange}
                        />
                        {loggedInUserData.admin && (
                           <div> 
                                <label 
                                  className="inline-flex items-center p-2 gap-2 mb-2"
                                    htmlFor="adminCb">
                                    <input id="adminCb" type="checkbox" className="" value={'1'}
                                    checked={admin}
                                    onClick={ev =>setAdmin(ev.target.checked)}/>
                                    <span>Admin</span>
                                </label> 
                            </div>
                        )}
                        <button type="submit" >Save</button>
                    </form>
                </div>
    );
}