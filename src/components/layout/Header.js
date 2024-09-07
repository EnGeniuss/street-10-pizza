'use client';
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { CartContext } from "../AppContext";
import Cart from "../icons/Cart";

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
    const {cartProducts} = useContext(CartContext);
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
            <Link href={'/menu'}>Menu</Link>
            <Link href={'/#about'}>About</Link>
            <Link href={'/#contact'}>Contact</Link>
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
            <Link href={'/cart'} className="relative">
             <Cart/> 
             <span className="py-1 px-2 absolute -top-2 -right-4 bg-primary text-white text-xs rounded-full leading-3">
                {cartProducts.length}
            </span></Link>
        </nav>
      </header>
      </>
    );
}