'use client';

import { useSession } from "next-auth/react"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
    const session = useSession();
    const [fName, setFName] = useState(session?.data?.user?.name.split(' ')[0] || '');
    const [lName, setLName] = useState(session?.data?.user?.name.split(' ')[1] || '');
    const [userName, setUserName] = useState('');
    const [image, setImage] = useState('');
    const {status} = session;
    const router = useRouter();
   
    useEffect(() =>{
        if (status === 'authenticated') {
            setFName(session.data.user.name.split(' ')[0]);
            setLName(session.data.user.name.split(' ')[1]);
            setImage(session.data.user.image);
        }
        }, [session, status]);

    async function handleProfileInfoUpdate(ev) {
        ev.preventDefault();
        toast('Saving...');
        const savingPromise = new Promise(async(resolve, reject) => {
            const response = await fetch('/api/profile',{
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({name:userName, image}),
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
        const newUsername = fName.trim() + ' ' + lName?.trim();
        setUserName(newUsername);
    }

    async function handleFileChange(ev) {
        const files = ev.target.files;
        if (files?.length === 1) {
            const data = new FormData;
            data.set('file', files[0]);
            toast('Uploading...');
            const response = await fetch('/api/upload', {
                method: 'POST',
                body:data,

            });
            if (response.ok){
                toast.success('Upload complete!');
            } else {
                toast.error('Upload error');
            }
            const link = await response.json();
            setImage(link);
        }
    }

    if (status === 'loading') {
        return 'loading...';
    }
    if (status === 'unauthenticated') {
        return router.push('/login');

    }

    // const userImage = session.data.user?.image;

    return (
        <section className="mt-8">
            <h1 className="text-center text-primary text-4xl mt-4 mb-4">
            Profile
            </h1>
            <div className="max-w-md mx-auto">
                <div className="flex gap-2 items-center">
                    <div>
                        <div className="rounded-lg p-2 relative w-max-[120px]">
                            {image && (
                                <Image className="rounded-lg w-full h-full mb-1" src={image} width={150} height={150} alt={'avatar'}/>
                            )}
                            
                            <label>
                                <input type="file" className="hidden" onChange={handleFileChange}/>
                                <span className="block border border-gray-100 cursor-pointer rounded-lg text-center">Edit</span>
                            </label>
                        </div>
                    </div>
                    <form className="grow" onSubmit={handleProfileInfoUpdate}>
                            <div>
                                <input type="text" placeholder="First Name"
                                value={fName} onChange={ev => setFName(ev.target.value)}/>
                            </div>
                            <div>
                                <input type="text" placeholder="Last Name"
                                value={lName} onChange={ev => setLName(ev.target.value)}/>
                            </div>
                        <input type="email" disabled={true} value={session.data.user.email}
                        />
                        <button type="submit" >Save</button>
                    </form>
                </div>
            </div>
        </section>
    )
}