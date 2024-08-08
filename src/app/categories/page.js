'use client';
import checkProfile from "@/components/CheckProfile";
import DeleteButton from "@/components/icons/DeleteButton";
import UserTabs from "@/components/layout/UserTabs";
import { Category } from "@/models/Category";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function CategoriesPage() {

    const [categoryName, setCategoryName] = useState('');
    const {loading:profileLoading, data:profileData} = checkProfile();
    const [categories,setCategories] = useState([]);
    const [editedCategory, setEditedCategory] = useState(null);
    const router=useRouter();

    useEffect(() => {
        fetchCategories();
    }, []);

    function fetchCategories() {
        fetch('/api/categories').then(res => {
            res.json().then(categories => {
            setCategories(categories);
            });
        });
    }

    async function handleDeleteClick(_id) {
        const promise = new Promise(async (resolve, reject) =>{
            const response = await fetch('/api/categories?_id='+_id, {
                method: 'DELETE',
            });
            if (response.ok) {
                resolve();
            } else {
                reject();
            }
        });
        await toast.promise(promise, {
            loading: 'Deleting...',
            success:'Deleted!',
            error:'Error occurred',
        });
        fetchCategories();
    }
    async function handleCategorySubmit(ev) {
        ev.preventDefault();
        const categoryCreatePromise = new Promise(async (resolve, reject) => {
            const data = {name:categoryName};
            if (editedCategory) {
                data._id = editedCategory._id; 
            }
            const response = await fetch('/api/categories', {
                method: editedCategory ? 'PUT' : 'POST',
                headers: {'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            setCategoryName('');
            fetchCategories();
            if (response.ok)
                resolve();
            else 
                reject();
        });
        await toast.promise(categoryCreatePromise, {
            loading: editedCategory?
                        'Updating category...'
                        : 'Adding new category...',
            success: editedCategory? 'Category updated' : 'New category added!',
            error: 'Error',
        });
    }

    if (profileLoading) {
        return 'Loading user info...';
    }
    if (!profileData.admin) {
        return router.push('/login')
    }
    return (
        <section className="mt-8 max-w-xl mx-auto">
            <UserTabs isAdmin={true}/>
            <form className="mt-8" onSubmit={handleCategorySubmit}>
                <div className="flex gap-2 justify-center items-end">
                    <div className="grow">
                        <label>
                            {editedCategory? 'Update category' : 'New category name'}
                            {editedCategory && (
                                <>: <b>{editedCategory.name}</b></>
                            )}
                        </label>
                        <input type="text"
                                value={categoryName}
                                onChange={ev =>setCategoryName(ev.target.value)}
                        />
                    </div>
                    <div className="mb-2.5 flex gap-2">
                        <button
                        type="button"
                        onClick={() =>{
                            setEditedCategory(null);
                            setCategoryName('');
                        }}>
                            Cancel
                        </button>
                        <button type="submit">
                            {editedCategory ? 'Update' : 'Create'}
                        </button>
                    </div>
                </div>
            </form>
            <div>
                <h2 className="mt-8 text-sm text-gray-500">Categories:</h2>
                {categories?.length > 0 && categories.map(c => (
                    <div
                        className="bg-gray-100 rounded-md p--2 px-4 flex gap-1 mb-1 items-center">
                        <div className="grow">{c.name}</div>
                        <div className="flex gap-1">
                            <button 
                                type="button"
                                onClick={() => {
                                    setEditedCategory(c);
                                    setCategoryName(c.name);
                                    }}  
                                >Edit
                            </button>
                            <DeleteButton 
                                label="Delete" 
                                onDelete={() =>handleDeleteClick(c._id)}/>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}