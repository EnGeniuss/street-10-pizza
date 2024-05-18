'use client';
import {signIn} from "next-auth/react";
import { useState } from "react";
import Image from "next/image";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginInProgress, setLoginInProgress] = useState(false);
    async function handleFormSubmit(ev){
        ev.preventDefault();
        setLoginInProgress(false);
        
        await signIn('credentials', {email, password,callbackUrl: '/'});

        setLoginInProgress(true);
    }
    return(
        <section className=" mt-8">
            <h1 className="text-center text-primary text-4xl mt-4 mb-4">
                Login
            </h1>
            <form className="max-w-xs mx-auto" onSubmit={handleFormSubmit}>
            <input type="email" name="email" placeholder="Email" value={email}
                disabled={loginInProgress} 
                onChange={ev => setEmail(ev.target.value)}/>
                <input type="password" name="password" placeholder="Password" value={password}
                disabled={loginInProgress}
                onChange={ev =>setPassword(ev.target.value)}/>
                <button type="submit" disabled={loginInProgress}>
                    Login
                </button>
                <div className=" my-4 text-center text-gray-500">
                    or login with your provider
                </div>
            </form>
                <button onClick={()=> signIn('google',{callbackUrl: '/'})} className=" max-w-xs mx-auto flex gap-4 justify-center items-center">
                    <Image src={'/google.png'} alt={''} width={24} height={24}/>
                    Login with google
                </button>

        </section>
    );
} 