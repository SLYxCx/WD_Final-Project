'use client'
import React from "react";
import { useRouter } from "next/navigation";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from '../firebase/config';
import { useState } from 'react';

const SignIn = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const SignInWithEmailAndPassword = useSignInWithEmailAndPassword(auth)
    const router = useRouter()

    const handleSignIn = async () => {

        try {
            const res = await SignInWithEmailAndPassword(email, password)
            sessionStorage.setItem('user', 'true')
            setEmail('')
            setPassword('')
            router.push('/')

        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
            />
            <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-4 bg-gray-700 rounded outline-non text-white placeholder-gray-500"
            />
            <button
            onClick={handleSignIn}
            className="w-full p-3 bg-blue-500 text-white rounded mt-4 hover:bg-blue-600"
            >
            Sign In
            </button>
        </div>
    );
};

export default SignIn;