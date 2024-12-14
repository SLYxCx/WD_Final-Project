'use client'
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import GoogleButton from "react-google-button";


const Navbar = () => {
    const { status } = useSession()

    return (
        <nav className="bg-green-800 p-4 flex justify-between items-center">
            <div>
            {
                status === 'authenticated' ? (
                    <button onClick={() => signOut()}>Log Out</button>
            ) : (
                <GoogleButton onClick={() => signIn('google')}/>
            )}
            </div>
        </nav>
    )
}

export default Navbar