import Link from "next/link";

export default function Home() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">
        Welcome to Event Management App
      </h1>
      <p className="mb-4">Manage your events effortlessly</p>
      <Link href="/events">
        <p className="bg-blue-600 text-white px-4 py-2 rounded">View Events</p>
      </Link>
    </div>
  );
}
