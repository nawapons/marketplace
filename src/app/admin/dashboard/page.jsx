import React from "react"
import { DashboardComponents } from "@/app/components/Dashboard";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
export default function Page() {
  const session = getServerSession();
  if (!session) {
    redirect("/")
  }
  return (
    <>
      <h1 className="text-2xl mt-4 text-center">Dashboard</h1>
      <DashboardComponents />
    </>
  )
}