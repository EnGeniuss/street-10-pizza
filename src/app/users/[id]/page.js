'use client';
import checkProfile from "@/components/CheckProfile";
import UserForm from "@/components/layout/UserForm";
import UserTabs from "@/components/layout/UserTabs";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function EditUserPage() {
    const {loading, data} = checkProfile();
    const [user,setUser] = useState(null);
    const {id} = useParams();
    const router = useRouter();
    
    useEffect(() => {
        fetch('/api/profile/?_id='+id).then(response => {
            response.json().then(user => {
                setUser(user);
            });
        })
    }, []);

    async function handleSaveButtonClick(ev, data) {
        ev.preventDefault();
        const promise = new Promise (async (resolve, reject) => {
            const res = await fetch('/api/profile', {
                method:'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({...data, _id:id}),
            });
            if (res.ok)
                resolve();
            else 
                reject();
        });
        await toast.promise(promise, {
            loading: 'Saving user...',
            success: 'User saved!',
            error: 'Error occurred while saving',
        });
        return router.push('/users');
    }
    if (loading) {
        return 'Loading user profile...';
    }
    if (!data.admin) {
        return 'Not an admin!';
    }

    return (
        <section className="mt-8 mx-auto max-2xl">
            <UserTabs isAdmin={true} />
            <div className="mt-8">
                <UserForm user={user} onSave={handleSaveButtonClick}/>
            </div>
        </section>
    )
}