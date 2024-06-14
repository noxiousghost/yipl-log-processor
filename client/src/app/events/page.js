"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import DataTable, { createTheme } from "react-data-table-component";

export function EventTable() {
  const [search, setSearch] = useState("");
  const [events, setEvents] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const router = useRouter();
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/events")
      .then((response) => {
        setEvents(response.data);
        setFiltered(response.data);
      })
      .catch((error) => console.error(error));
  }, []);
  useEffect(() => {
    const result = events.filter((event) =>
      event.title.toLowerCase().match(search.toLowerCase())
    );
    setFiltered(result);
  }, [search]);

  createTheme(
    "light",
    {
      text: {
        primary: "black",

        secondary: "#2563eb",
      },
      background: {
        default: "#f3f4f6",
      },
      context: {
        background: "#2563eb",
        text: "black",
      },
      divider: {
        default: "#2563eb",
      },
      selected: {
        default: "#2563eb",
        text: "rgba(255, 255, 255, 1)",
      },
      highlightOnHover: {
        default: "#2563eb",
        text: "rgba(255, 255, 255, 1)",
      },
      striped: {
        default: "#FAFAFA",
        text: "rgba(0, 0, 0, 0.87)",
      },
      action: {
        button: "rgba(0,0,0,.54)",
        hover: "rgba(0,0,0,.08)",
        disabled: "rgba(0,0,0,.12)",
      },
    },
    "dark"
  );

  const columns = [
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Start Date",
      selector: (row) => row.startDate,
      sortable: true,
    },
    {
      name: "End Date",
      selector: (row) => row.endDate,
      sortable: true,
    },
    {
      name: "Participation",
      selector: (row) => row.totalParticipants,
      sortable: true,
    },
  ];
  return (
    <DataTable
      // title="Events List"
      columns={columns}
      data={filtered}
      pagination
      fixedHeader
      fixedHeaderScrollHeight="580px"
      selectableRows
      selectableRowsHighlight
      highlightOnHover
      subHeader
      subHeaderComponent={
        <input
          type="text"
          className="block p-2 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-blue-300"
          placeholder="Search Events"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      }
      subHeaderAlign="left"
      responsive
      theme="light"
      onRowClicked={(row) => {
        router.push(`/events/${row.id}`);
      }}
    />
  );
}

export default function Events() {
  return (
    <div className="max-w-3xl mx-auto mt- p-4 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Events</h1>
      <EventTable />
      <Link href="/events/create">
        <p className="block bg-blue-600 text-white px-4 py-2 rounded mt-4 text-center">
          Create New Event
        </p>
      </Link>
    </div>
  );
}
