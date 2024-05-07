'use client';
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header () {
    const session = useSession();
    console.log(session);
    const status = session?.status;
    const userData = session.data?.user;
    const router = useRouter();

    const handleSignOut = async () => {
        await signOut({ redirect: false }); // Sign out the user without redirection
        
        // Redirect to the home page
        router.push('/');
    };

    let userName = userData?.name || userData?.email;
    if (userName && userName.includes(' ')){
        userName = userName.split(' ')[0];
    }
    return(
        <>
        <header className="flex items-center justify-between">
        <nav className="flex items-center gap-8 text-gray-500 font-semibold">
            <Link className="text-primary font-semibold text-2xl" href="/">
            10TH PIZZA
            </Link>
            <Link href={'/'}>Home</Link>
            <Link href={''}>Menu</Link>
            <Link href={''}>About</Link>
            <Link href={''}>Contact</Link>
        </nav>
        <nav className=" flex items-center gap-4 text-gray-500 font-semibold">
            {status === 'authenticated' && (
                <>
                    <Link href={'/profile'} className="whitespace-nowrap">Hello, {userName}</Link>
                    <button 
                        onClick={handleSignOut}
                        className="bg-primary rounded-full text-white px-8 py-2">
                        Logout
                    </button>
                </>
            )}
            {status === 'unauthenticated' && (
                <>
                 <Link href={'/login'}>Login</Link>
                 <Link href={'/register'} className="bg-primary rounded-full text-white px-8 py-2">
                    Register
                </Link>
                </>
            )}
           
        </nav>
      </header>
      </>
    );
}