"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/events")
      .then((response) => setEvents(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Events</h1>
      <ul className="bg-white p-4 rounded shadow">
        {events.map((event) => (
          <li key={event.id} className="mb-2">
            <Link href={`/events/${event.id}`}>
              <p className="text-blue-600">{event.title}</p>
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/events/create">
        <p className="block bg-blue-600 text-white px-4 py-2 rounded mt-4 text-center">
          Create New Event
        </p>
      </Link>
    </div>
  );
}
