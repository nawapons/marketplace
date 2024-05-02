
"use client"
import { signOut } from "next-auth/react";
import { Button, Navbar } from "flowbite-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Spinner } from "flowbite-react";
export function NavbarComponents() {
  const { data: session } = useSession()
  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Market Place</span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        {!session || !session.user ? (
          <Button as={Link} href="/register">Get started</Button>
        ) : (
          <button onClick={() => signOut({ callbackUrl: '/login', redirect: true })}>
            Sign Out
          </button>
        )
        }
        <Navbar.Toggle />
      </div >
      <Navbar.Collapse>
        {!session || !session.user ? (
          <>
            <Navbar.Link href="#" active>
              Home
            </Navbar.Link>
            <Navbar.Link href="#">About</Navbar.Link>
            <Navbar.Link href="#">Services</Navbar.Link>
            <Navbar.Link href="#">Pricing</Navbar.Link>
            <Navbar.Link href="#">Contact</Navbar.Link>
          </>
        ) : (
          <>
            <Navbar.Link href="/admin/dashboard" active>
              Home
            </Navbar.Link>
            <Navbar.Link href="/admin/product">Product</Navbar.Link>
            <Navbar.Link href="#">Bank</Navbar.Link>
            <Navbar.Link href="#">Manage User</Navbar.Link>
            <Navbar.Link href="#">Profile</Navbar.Link>
          </>
        )
        }

      </Navbar.Collapse>
    </Navbar >
  );
}
