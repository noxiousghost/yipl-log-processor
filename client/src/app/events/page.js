"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import DataTable, { createTheme } from "react-data-table-component";
import api from "@/utils/api";

export function EventTable() {
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [events, setEvents] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const router = useRouter();
  useEffect(() => {
    api
      .get("/events")
      .then((response) => {
        setEvents(response.data);
        setFiltered(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    let result = events;

    if (search) {
      result = result.filter((event) =>
        event.title.toLowerCase().match(search.toLowerCase())
      );
    }

    if (startDate) {
      result = result.filter(
        (event) => new Date(event.startDate) >= new Date(startDate)
      );
    }

    if (endDate) {
      result = result.filter(
        (event) => new Date(event.endDate) <= new Date(endDate)
      );
    }

    setFiltered(result);
  }, [search, startDate, endDate, events]);

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
        <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
          <input
            type="text"
            className="block p-2 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-blue-300"
            placeholder="Search Events"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          From:
          <input
            type="date"
            className="block p-2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-blue-300"
            placeholder="Start Date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          To:
          <input
            type="date"
            className="block p-2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-blue-300"
            placeholder="End Date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
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
    <div className="max-w-3xl mx-auto mt-4 p-4 rounded shadow">
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
