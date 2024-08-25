"use client";
import React from "react";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import { loginAdminApi } from "../../assets/apis/loginAdmin";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";

interface FormValues {
  email: string;
  password: string;
}

export default function Home() {
  const router = useRouter();
  const { handleSubmit, register } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    try {
      const response = await loginAdminApi({ ...data });
      const result = await response.json();
      if (response?.status !== 200) {
        toast.error(result?.msg);
      }
      if (response?.status === 200) {
        localStorage.setItem(
          "userAuthentication",
          JSON.stringify({
            token: result?.token,
            id: result?.id,
            role: result?.role,
          })
        );
        router.push("/Dashboard");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const onError: SubmitErrorHandler<FormValues> = async (error) => {
    const { email, password } = error;
    if (email?.message) toast.warning(email?.message);
    if (password?.message) toast.warning(password?.message);
  };

  return (
    <>
      <main className="form-parent">
        <form action="#" onSubmit={handleSubmit(onSubmit, onError)}>
          <h1>Login Admin</h1>
          <div className="grid text-white mb-4">
            <label htmlFor="email">Email: </label>
            <input
              type="text"
              id="email"
              autoComplete="off"
              placeholder="Write Your Email"
              {...register("email", {
                required: {
                  value: true,
                  message: "Email Field is Required",
                },
                pattern: {
                  value: /\w{3,15}@gmail\.com/,
                  message: "Invalid Email Syntax",
                },
              })}
            />
          </div>
          <div className="grid text-white">
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              id="password"
              placeholder="Write Your Password"
              {...register("password", {
                required: {
                  value: true,
                  message: "Password Field are Required",
                },
                minLength: {
                  value: 8,
                  message: "Password Min Length is 8",
                },
                maxLength: {
                  value: 15,
                  message: "Password Max Length is 15",
                },
              })}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </main>
      <ToastContainer pauseOnFocusLoss={false} pauseOnHover={false} />
    </>
  );
}
