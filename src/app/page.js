import Image from "next/image";
import HomeComponents from "./components/Home";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
export default function Home() {
  const session = getServerSession();
  if(session){
    redirect("/admin/dashboard")
  }
  return (
    <>
      <HomeComponents />
    </>
  );
}
