import Link from "next/link";

const NavBar = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white w-full left-0 border-b border-gray-200 sticky top-0 z-50">
      {/* <nav className="bg-blue-600 p-4 text-white fixed w-full top-0 left-0 border-b border-gray-200"> */}
      <div className="container mx-auto flex space-y-3 sm:space-y-0  flex-wrap sm:flex-nowrap sm:flex-row w-full justify-around md:justify-between items-center ">
        <Link href="/">
          <p className="font-bold">Event Management</p>
        </Link>
        <div className="flex flex-col p-4 mt-4 mx-2 order-1 rounded-lg border md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0">
          <Link href="/events">
            <p className="mx-2">Events</p>
          </Link>
          <Link href="/auth/login">
            <p className="mx-2">Login</p>
          </Link>
          <Link href="/auth/signup">
            <p className="mx-2">Signup</p>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
