
"use client";

import { Button, Label, TextInput } from "flowbite-react";
import React, { useState } from "react"
import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";
import axios from "axios"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function Page() {
  const router = useRouter();
  const { data: session } = useSession();
  if (session) {
    router.push("/dashboard")
  }
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [error, setError] = useState("")
  const handleRegister = async () => {
    try {
      const response = await axios.post("/api/auth/register", {
        fullname: fullname,
        email: email,
        password: password
      })
      if (response.status === 201) {
        router.push("/login")
      }
    } catch (err) {
      setError(err.response.data.message)
    }
  }
  return (
    <>

      <div className="container max-w-md mx-auto px-5 py-24">
        <Alert color="failure" className={"mb-3 " + (error === "" ? "hidden" : "")} icon={HiInformationCircle}>
          <span className="font-medium">{error}</span>
        </Alert>
        <h1 className="text-2xl text-center font-bold">Create Account</h1>
        <form className="flex  flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="fullname" value="Your name" />
            </div>
            <TextInput onChange={(e) => setFullname(e.target.value)} id="fullname" type="text" required shadow />
          </div>
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
          <Button onClick={handleRegister}>Register new account</Button>
        </form>
      </div>
    </>


  );
}
