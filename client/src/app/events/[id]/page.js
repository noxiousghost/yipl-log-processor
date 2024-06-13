"use client";
// import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

export default function EventDetail() {
  // const router = useRouter();
  // const { id } = router.query;
  const pathname = usePathname();
  const id = pathname.split("/").pop(); // Extracting the ID from the pathname
  const [event, setEvent] = useState(null);

  useEffect(() => {
    if (id) {
      console.log(`Fetching event with ID: ${id}`); // Debug log
      axios
        .get(`http://localhost:4000/api/events/${id}`)
        .then((response) => {
          console.log(`Event data received: ${JSON.stringify(response.data)}`); // Debug log
          setEvent(response.data);
        })
        .catch((error) => console.error(error));
    }
  }, [id]);

  if (!event) return <p>Loading...</p>; // Ensure event is not null before rendering

  return (
    <div className="max-w-2xl mx-auto mt-8 bg-white p-4 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">{event.title}</h1>
      <p className="mb-4">{event.description}</p>
      <p className="mb-2">Start Date: {event.startDate}</p>
      <p className="mb-2">End Date: {event.endDate}</p>
      <p className="mb-2">Total Participants: {event.totalParticipants}</p>
    </div>
  );
}
