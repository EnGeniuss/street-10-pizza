'use client';

import EditableImage from "@/components/layout/EditableImage";
import UserForm from "@/components/layout/UserForm";
import UserTabs from "@/components/layout/UserTabs";
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
    const session = useSession();
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState('');
    const [profileFetched, setProfileFetched] = useState(false);
    const {status} = session;
    const router = useRouter();
   
    useEffect(() =>{
        if (status === 'authenticated') {
            fetch('/api/profile').then( response =>{
                response.json().then(data => {
                    setUser(data);
                    setIsAdmin(data.admin);
                    setProfileFetched(true);
                })
            });
        }
        }, [session, status]);

    async function handleProfileInfoUpdate(ev, data) {
        ev.preventDefault();
        toast('Saving...');
        const savingPromise = new Promise(async(resolve, reject) => {
            const response = await fetch('/api/profile',{
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data),
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
            <div className="max-w-md mx-auto mt-8">
                <UserForm user={user} onSave={handleProfileInfoUpdate}/>
            </div>
        </section>
    )
}