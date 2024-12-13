'use client'
import Link from "next/link";
import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import SignIn from "./SignIn";


const Navbar = () => {
    const [user] = useAuthState(auth);
    const router = useRouter();

    const handleLogOut = () => {
        signOut(auth)
        .then(() => {
            sessionStorage.removeItem('user');
            router.push('/');
        })
        .catch((error) => {
            console.error("Error signing out", error);
        });
    }

    // Placeholder SignIn Prompt - Will adjust setup later tomorrow
    const signInPrompt = () => {
        prompt (
            <SignIn />
        )
    }

    return (
        <nav className="bg-green-800 p-4 flex justify-between items-center">
            <div className="text-white text-xl">
                { user ? (
                    <button onClick={handleLogOut} className="bg-yellow-600 text-white px-4 py-2 rounded ml-2">
                        Log Out
                    </button>
                ) : (
                    <button onClick={signInPrompt} className="bg-green-700 text-white px-4 py-2 rounded ml-2">
                        Sign In
                    </button>
                ) }
            </div>
        </nav>
    )
}

export default Navbar