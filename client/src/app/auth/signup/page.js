"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      await axios.post("http://localhost:4000/auth/signup", data);
      router.push("/auth/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Signup</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-4 rounded shadow"
      >
        <div className="mb-4">
          <label>Username</label>
          <input
            className="w-full border p-2"
            {...register("username", { required: true })}
          />
          {errors.username && (
            <span className="text-red-500">Username is required</span>
          )}
        </div>
        <div className="mb-4">
          <label>Password</label>
          <input
            type="password"
            className="w-full border p-2"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <span className="text-red-500">Password is required</span>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Signup
        </button>
      </form>
    </div>
  );
}
