"use client";
import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/utils/api";
import { useAuth } from "@/utils/AuthContext";

export default function EventDetail() {
  const pathname = usePathname();
  const router = useRouter();
  const id = pathname.split("/").pop(); // Extracting the ID from the pathname
  const [event, setEvent] = useState(null);

  //protecting this route
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) {
    router.push("/auth/login");
    alert("must login to continue!");
  }

  useEffect(() => {
    if (id) {
      api
        .get(`http://localhost:4000/api/events/${id}`)
        .then((response) => {
          setEvent(response.data);
        })
        .catch((error) => console.error(error));
    }
  }, [id]);

  const deleteEvent = async () => {
    try {
      await axios.delete(`http://localhost:4000/api/events/${id}`);
      alert("deleted successfully");
      router.push("/events");
    } catch (error) {
      console.error(error);
    }
  };

  if (!event) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-8 bg-white p-4 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">{event.title}</h1>
      <p className="mb-4">{event.description}</p>
      <p className="mb-2">Start Date: {event.startDate}</p>
      <p className="mb-2">End Date: {event.endDate}</p>
      <p className="mb-10">Total Participants: {event.totalParticipants}</p>
      <Link href={`/events/edit/${event.id}`}>
        <button className="bg-blue-600 text-white px-4 py-2 mr-4 rounded">
          Edit Event
        </button>
      </Link>
      <button
        onClick={deleteEvent}
        className="bg-red-600 text-white px-4 py-2 rounded"
      >
        Delete Event
      </button>
      <Link href={"/events"}>
        <p className="text-blue-500">Back to list</p>
      </Link>
    </div>
  );
}
