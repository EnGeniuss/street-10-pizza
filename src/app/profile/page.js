'use client';
import { useSession } from "next-auth/react"
import { redirect } from "next/dist/server/api-utils";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const session = useSession();
    const {status} = session;
    const router = useRouter();

    if (status === 'loading') {
        return 'loading...';
    }
    if (status === 'unauthenticated') {
        return router.push('/login');

    }

    const userImage = session.data.user?.image;

    return (
        <section className="mt-8">
            <h1 className="text-center text-primary text-4xl mt-4 mb-4">
            Profile
            </h1>
            <form className="max-w-xs mx-auto">
                <div className="flex gap-4">
                    <div>
                    <Image src={userImage} width={64} height={64} alt={'avatar'}/>
                    </div>
                    <div className="grow">
                        <input type="text" placeholder="First Name"/>
                    </div>
                </div>
            </form>
        </section>
    )
}