'use client';
import checkProfile from "@/components/CheckProfile";
import UserTabs from "@/components/layout/UserTabs";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function UsersPage() {
    const [users, setUsers] = useState([]);
    const {loading, data} = checkProfile();

    useEffect(() => {
        fetch ('/api/users').then(response => {
            response.json().then(users => {
                setUsers(users);
            });
        });
    }, []);
    if (loading) {
        return 'Loading user info...';
    }
    if (!data.admin) {
        return 'Not an admin!';
    }
    return(
        <section className="mt-8 max-w-2xl mx-auto">
            test
            <UserTabs isAdmin={true}/>
            <div className="mt-8">
                {users?.length > 0 && users.map(user => (
                    <div className="bg-gray-100 rounded-lg mb-2 p-1 px-4 flex items-center gap-4">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 grow">
                            <div className="text-gray-900">
                                {!!user.name && (<span>{user.name}</span>)}
                                {!user.name && (<span className="italic">null</span>)}
                            </div>
                            <span className="text-gray-500">{user.email}</span>
                        </div>
                        <div>
                            <Link className="button" href={'/users/'+user._id}>
                                Edit
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}