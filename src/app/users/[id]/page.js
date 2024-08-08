'use client';
import checkProfile from "@/components/CheckProfile";
import UserForm from "@/components/layout/UserForm";
import UserTabs from "@/components/layout/UserTabs";

export default function EditUserPage() {
    const {loading, data} = checkProfile();

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
                <UserForm/>
            </div>
        </section>
    )
}