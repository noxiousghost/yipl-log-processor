"use client";
// NavBar.js
import Link from "next/link";
import { useAuth } from "@/utils/AuthContext";

const NavBar = () => {
  const { isLoggedIn, username, logout } = useAuth();

  return (
    <nav className="bg-blue-600 p-4 text-white w-full left-0 border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto flex space-y-3 sm:space-y-0 flex-wrap sm:flex-nowrap sm:flex-row w-full justify-around md:justify-between items-center">
        <Link href="/">
          <p className="font-bold cursor-pointer">Event Management</p>
        </Link>
        <div className="flex flex-col p-4 mt-4 mx-2 order-1 rounded-lg border md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0">
          {isLoggedIn ? (
            <>
              <p className="mx-2">Hello, {username}</p>
              <button onClick={logout} className="mx-2 bg-red-600 p-2 rounded">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login">
                <p className="mx-2 cursor-pointer">Login</p>
              </Link>
              <Link href="/auth/signup">
                <p className="mx-2 cursor-pointer">Signup</p>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
