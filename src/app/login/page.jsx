
"use client";

import { Button, Label, TextInput } from "flowbite-react";
import React, { useState } from "react"
import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Spinner } from "flowbite-react";
export default function Page() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("")
    const handleLogin = async () => {
        try {
            const response = await signIn('credentials', {
                email,
                password,
                redirect: false,
            })
            if (response.status === 200) {
                router.push("/dashboard")
            }else{
                setError("Login Failed, Try again...")
            }
        } catch (err) {
            setError("Login Failed, Try again...")
        }
    }
    return (
        <>
            <div className="container max-w-md mx-auto px-5 py-24">
                <Alert color="failure" className={"mb-3 " + (error === "" ? "hidden" : "")} icon={HiInformationCircle}>
                    <span className="font-medium">{error}</span>
                </Alert >
                <h1 className="text-2xl text-center font-bold">Login to get Access</h1>
                <form className="flex  flex-col gap-4">
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="email" value="Your email" />
                        </div>
                        <TextInput onChange={(e) => setEmail(e.target.value)} id="email" type="email" placeholder="name@flowbite.com" required shadow />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="password" value="Your password" />
                        </div>
                        <TextInput onChange={(e) => setPassword(e.target.value)} id="password" type="password" required shadow />
                    </div>
                    <Button onClick={handleLogin}>Login</Button>
                </form>
            </div >
        </>
    );
}
