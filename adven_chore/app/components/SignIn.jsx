'use client'
import React from "react";
import { useRouter } from "next/navigation";
import { useSignInWithEmailLink } from "react-firebase-hooks/auth";
import { auth } from '../firebase/config';
import { useState } from 'react';

const SignIn = () => {
    const [email, setEmail] = useState("")
    const SignInWithEmailLink = useSignInWithEmailLink(auth)
    const router = useRouter()

    const handleSignIn = async () => {

        try {
            const res = await SignInWithEmailLink(email)
            sessionStorage.setItem('user', 'true')
            setEmail('')
            router.push('/')

        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <label>Email</label>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
        </div>
    );
};

export default SignIn;