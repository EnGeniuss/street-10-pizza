'use client';
import { useState } from "react";
import EditableImage from "./EditableImage";
export default function UserForm({user, onSave}) {
    
    const [fName, setFName] = useState(user?.name.split(' ')[0] || '');
    const [lName, setLName] = useState(user?.name.split(' ')[1] || '');
    const [userName, setUserName] = useState(user?.userName || '');
    const [image, setImage] = useState(user?.image||'');
    const [phone,setPhone] = useState(user?.phone||'');
    const [streetAddress,setStreetAddress] = useState(user?.streetAddress||'');
    const [postalCode,setPostalCode] = useState(user?.postalCode||'');
    const [city,setCity] = useState(user?.city||'');
    const [country,setCountry] = useState(user?.country||'');
    // const newUsername = fName.trim() + ' ' + lName?.trim();
    // setUserName(newUsername);

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
                            type="email" disabled={true} 
                            value={user.email}
                        />
                        <label> Phone</label>
                        <input 
                            type="tel" placeholder="Phone number"
                            value={phone} onChange={ev => setPhone(ev.target.value)}
                        />
                        <label>Street</label>
                        <input 
                            type="text" placeholder="Street Address"
                            value={streetAddress} onChange={ev => setStreetAddress(ev.target.value)}
                        />
                        <div className="flex gap-2">
                            <div>
                                <label>Postal Code</label>
                                <input
                                    style={{'margin': '0'}}
                                    type="text" placeholder="Postal Code"
                                    value={postalCode} onChange={ev => setPostalCode(ev.target.value)}
                                />  
                            </div>
                            
                            <div>
                                <label>City</label>
                                <input
                                    style={{'margin': '0'}}
                                    type="text" placeholder="City"
                                    value={city} onChange={ev =>setCity(ev.target.value)}
                                />
                            </div>
                        </div>
                       
                        <label>Country</label>
                        <input
                            type="text" placeholder="Country"
                            value={country} onChange={ev => setCountry(ev.target.value)}
                        />
                        <button type="submit" >Save</button>
                    </form>
                </div>
    );
}