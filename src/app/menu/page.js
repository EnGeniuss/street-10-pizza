'use client';
import SectionHeader from "@/components/layout/SectionHeaders";
import MenuItem from "@/components/menu/MenuItem";
import { useEffect, useState } from "react"

export default function MenuPage() {
    const [categories,setCategories] = useState([]);
    const [menuItems,setMenuItems] = useState([]);
    useEffect(() => {
        fetch('/api/categories').then(res => {
            res.json().then(categories => setCategories(categories))
        });
        fetch('/api/menu-items').then(res => {
            res.json().then(menuItems => setMenuItems(menuItems));
        });
    },[]);
    return(
        <section className="mt-8">
            {categories?.length > 0 && categories.map(c => (
                <div key={c.id}>
                    <div className="text-center">
                        <SectionHeader mainHeader={c.name} />
                    </div>
                    {menuItems.filter(item => item.category === c._id).length === 0 ? (
                        <p>No items available for this category</p>
                    ) : (
                    <div className="grid grid-cols-3 gap-4 mt-6 mb-12">
                        {menuItems.filter(item => item.category === c._id).map(item => (
                            <MenuItem key={item.id} {...item} />
                        ))}
                    </div> 
                    )}
                </div>
            ))}
        </section>
    )
}