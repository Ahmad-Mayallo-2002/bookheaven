"use client";
import React from "react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { loginApi } from "./assets/apis/loginApi";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface FormValues {
  email: string;
  password: string;
}

export default function Home() {
  const router = useRouter();
  const { register, handleSubmit } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = async (data: object) => {
    try {
      const response = await loginApi({ ...data });
      const result = await response.json();
      if (response?.status === 400) toast.error(result?.msg);

      if (response?.status === 200) {
        localStorage.setItem(
          "userAuthentication",
          JSON.stringify({
            token: result?.token,
            id: result?.id,
            role: result?.role,
          })
        );
        router.push("/Home");
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
        <form
          action="#"
          method="POST"
          onSubmit={handleSubmit(onSubmit, onError)}
        >
          <h1>Login</h1>
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
          <p className="text-white text-[14px]">
            You Don't have Account ?{" "}
            <Link href="/SignUp" className="text-[14px] hover:text-blue">
              Create New Account
            </Link>
          </p>
          <button type="submit">Login</button>
        </form>
        <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
      </main>
    </>
  );
}
