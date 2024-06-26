"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import api from "@/utils/api";
import { useAuth } from "@/utils/AuthContext";

export default function CreateEvent() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) {
    router.push("/auth/login");
    alert("must login to continue!");
  }
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const validateEndDate = (value) => {
    const startDateValue = watch("startDate");
    if (startDateValue && new Date(value) < new Date(startDateValue)) {
      return "End date should be greater than the start date";
    }

    return true;
  };

  const onSubmit = async (data) => {
    try {
      await api.post("/events", data);
      router.push("/events");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Create New Event</h1>
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
            {...register("endDate", {
              required: true,
              validate: validateEndDate,
            })}
          />
          {errors.endDate && (
            <span className="text-red-500">{errors.endDate.message}</span>
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
            <>
              <span className="text-red-500">{errors.endDate.message}</span>
              <span className="text-red-500">
                Total Participants is required
              </span>
            </>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Create Event
        </button>
      </form>
    </div>
  );
}
