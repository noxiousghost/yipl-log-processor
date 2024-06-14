"use client";

import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditEvent() {
  const pathname = usePathname();
  const router = useRouter();
  const id = pathname.split("/").pop(); // Extracting the ID from the pathname
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:4000/api/events/${id}`)
        .then((response) => {
          setEvent(response.data);
          setValue("title", response.data.title);
          setValue("description", response.data.description);
          setValue("startDate", response.data.startDate);
          setValue("endDate", response.data.endDate);
          setValue("totalParticipants", response.data.totalParticipants);
        })
        .catch((error) => console.error(error));
    }
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      await axios.put(`http://localhost:4000/api/events/${id}`, data);
      router.push(`/events/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  if (!event) return <p>Loading...</p>;

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Edit Event</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-4 rounded shadow"
      >
        <div className="mb-4">
          <label>Title</label>
          <input
            className="w-full border p-2"
            {...register("title", { required: true })}
          />
          {errors.title && (
            <span className="text-red-500">Title is required</span>
          )}
        </div>
        <div className="mb-4">
          <label>Description</label>
          <input
            className="w-full border p-2"
            {...register("description", { required: true })}
          />
          {errors.description && (
            <span className="text-red-500">Description is required</span>
          )}
        </div>
        <div className="mb-4">
          <label>Start Date</label>
          <input
            type="date"
            className="w-full border p-2"
            {...register("startDate", { required: true })}
          />
          {errors.startDate && (
            <span className="text-red-500">Start Date is required</span>
          )}
        </div>
        <div className="mb-4">
          <label>End Date</label>
          <input
            type="date"
            className="w-full border p-2"
            {...register("endDate", { required: true })}
          />
          {errors.endDate && (
            <span className="text-red-500">End Date is required</span>
          )}
        </div>
        <div className="mb-4">
          <label>Total Participants</label>
          <input
            type="number"
            className="w-full border p-2"
            {...register("totalParticipants", { required: true })}
          />
          {errors.totalParticipants && (
            <span className="text-red-500">Total Participants is required</span>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Update Event
        </button>
      </form>
    </div>
  );
}
