 'use client';
import checkProfile from "@/components/CheckProfile";
import Right from "@/components/icons/Right";
import UserTabs from "@/components/layout/UserTabs";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function MenuItemsPage() {

    const [menuItems, setMenuItems] = useState([]);
    const {loading, data} = checkProfile();
    useEffect(() => {
        fetch('/api/menu-items').then(res => {
           res.json().then(menuItems => {
                setMenuItems(menuItems);
           });
        })
    }, []);

    if (loading) {
        return 'Loading user info...';
    }

    if (!data.admin) {
        return router.push('/login')
    }
    return (
        <section className="mt-8 max-w-2xl mx-auto">
            <UserTabs isAdmin={true} />
            <div className="mt-8">
                <Link
                    className="button"
                    href={'/menu-items/new'}>Create new menu item
                    <Right/>
                </Link>
            </div>
                <div>
                    <h2 className="text-sm text-gray-500 mt-8">Edit menu item:</h2>
                    <div className="grid grid-cols-3 gap-4">
                    {menuItems?.length > 0 && menuItems.map(item =>(
                        <Link href={'/menu-items/edit/'+item._id} 
                            className="bg-gray-200 rounded-lg p-4"
                        >
                            <div className="relative">
                                <Image 
                                className="rounded-md"
                                src={item.image} alt={''} width={200} height={200}/>
                            </div>
                            <div className="text-center">
                            {item.name}
                            </div>  
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}