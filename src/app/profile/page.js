'use client';

import EditableImage from "@/components/layout/EditableImage";
import UserTabs from "@/components/layout/UserTabs";
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
    const session = useSession();
    const [fName, setFName] = useState(session?.data?.user?.name.split(' ')[0] || '');
    const [lName, setLName] = useState(session?.data?.user?.name.split(' ')[1] || '');
    const [userName, setUserName] = useState('');
    const [image, setImage] = useState('');
    const [phone,setPhone] = useState('');
    const [streetAddress,setStreetAddress] = useState('');
    const [postalCode,setPostalCode] = useState('');
    const [city,setCity] = useState('');
    const [country,setCountry] = useState('');
    const [isAdmin, setIsAdmin] = useState('');
    const [profileFetched, setProfileFetched] = useState(false);
    const {status} = session;
    const router = useRouter();
   
    useEffect(() =>{
        if (status === 'authenticated') {
            setFName(session.data.user.name.split(' ')[0]);
            setLName(session.data.user.name.split(' ')[1]);
            setImage(session.data.user.image);
            const newUsername = fName.trim() + ' ' + lName?.trim();
            setUserName(newUsername);
            fetch('/api/profile').then( response =>{
                response.json().then(data => {
                    setPhone(data.phone);
                    setStreetAddress(data.streetAddress);
                    setPostalCode(data.postalCode);
                    setCity(data.city);
                    setCountry(data.country);
                    setIsAdmin(data.admin);
                    setProfileFetched(true);
                })
            });
        }
        }, [session, status]);

    async function handleProfileInfoUpdate(ev) {
        ev.preventDefault();
        toast('Saving...');
        const savingPromise = new Promise(async(resolve, reject) => {
            const response = await fetch('/api/profile',{
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    name:userName,
                    image:image,
                    phone,
                    streetAddress,
                    postalCode,
                    city,
                    country,
                }),
            });
            if (response.ok)
                resolve();
            else 
                reject();
        });
        await toast.promise(savingPromise, {
            loading: 'Saving...',
            success: 'Profile saved!',
            error: 'Error',
        });
    }

    if (status === 'loading' || !profileFetched) {
        return 'loading...';
    }
    if (status === 'unauthenticated') {
        return router.push('/login');

    }

    // const userImage = session.data.user?.image;

    return (
        <section className="mt-8">
            <UserTabs isAdmin={isAdmin} />
            <div className="max-w-md mx-auto">
                <div className="flex gap-2">
                    <div>
                        <div className="rounded-lg p-2 relative w-max-[120px]">
                            <EditableImage link={image} setLink={setImage}/>
                        </div>
                    </div>
                    <form className="grow" onSubmit={handleProfileInfoUpdate}>
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
                            value={session.data.user.email}
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
            </div>
        </section>
    )
}