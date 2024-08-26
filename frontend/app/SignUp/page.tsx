"use client";
import React from "react";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import {
  converImageToBase64,
  defaultUserImage,
  User,
} from "../assets/data/data";
import { signUpApi } from "../assets/apis/signUpApi";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Loading from "../loading";
interface errorData {
  username: { message: string };
  email: { message: string };
  password: { message: string };
  confirmPassword: { message: string };
}
export default function SignUp() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const { register, handleSubmit } = useForm();
  const [image, setImage] = React.useState<string>(defaultUserImage);
  const [base64, setBase64] = React.useState<string | ArrayBuffer | null>("");
  const handleImageChange = async (event: { target: { files: any[] } }) => {
    try {
      const file = event.target.files[0];
      setImage(URL.createObjectURL(file));
      if (file) {
        const imageBase64 = await converImageToBase64(file);
        setBase64(imageBase64);
      }
    } catch (error) {
      console.error("Error processing image:", error);
    }
  };
  const onSubmit: any = async (data: User) => {
    try {
      setLoading(true);
      if (data?.avatar) data = { ...data, avatar: String(base64) };
      if (!data?.avatar) {
        data = {
          _id: data._id,
          username: data.username,
          email: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword,
        };
      }
      const response = await signUpApi(data);
      const result = await response.json();
      if (response.status === 400) toast.info(result?.msg);
      if (response.status === 200) router.push("/");
    } catch (error) {
      setLoading(false);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const onError: any = async (error: errorData) => {
    const { username, email, password, confirmPassword } = error;
    if (username?.message) toast.error(username?.message);
    if (email?.message) toast.error(email?.message);
    if (password?.message) toast.error(password?.message);
    if (confirmPassword?.message) toast.error(confirmPassword?.message);
  };
  return (
    <>
      <main className="form-parent">
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <h1>Sign Up</h1>
          <div>
            <label htmlFor="avatar" className="cursor-pointer w-fit mx-auto">
              <img
                src={image}
                alt="Default User Image"
                className="rounded-full"
                width={50}
              />
              <input
                type="file"
                id="avatar"
                {...register("avatar", { onChange: handleImageChange })}
                hidden
                accept=".jpg, .jpeg, .png"
              />
            </label>
          </div>
          <div>
            <label htmlFor="username">Username: </label>
            <input
              type="text"
              id="username"
              autoComplete="off"
              placeholder="Enter Your Username"
              {...register("username", {
                required: {
                  value: true,
                  message: "Username Field is Reuired",
                },
                minLength: {
                  value: 4,
                  message: "Minimum Username Length is 4",
                },
                maxLength: {
                  value: 15,
                  message: "Maximum Username Length is 15",
                },
              })}
            />
          </div>
          <div>
            <label htmlFor="email">Email: </label>
            <input
              type="text"
              id="email"
              placeholder="Enter Your Email"
              autoComplete="off"
              {...register("email", {
                required: {
                  value: true,
                  message: "Email Field is Required",
                },
                pattern: {
                  value: /\w{4,15}@gmail\.com/,
                  message: "Invalid Email Syntax",
                },
              })}
            />
          </div>
          <div>
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              id="password"
              placeholder="Enter Your Password"
              {...register("password", {
                required: {
                  value: true,
                  message: "Password Field is Required",
                },
                minLength: {
                  value: 8,
                  message: "Minimum Password Length is 8",
                },
                maxLength: {
                  value: 15,
                  message: "Maximum Password Length is 15",
                },
              })}
            />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password: </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm Your Password"
              {...register("confirmPassword", {
                required: {
                  value: true,
                  message: "Confirm Password Field is Required",
                },
                minLength: {
                  value: 8,
                  message: "Minimum Password Length is 8",
                },
                maxLength: {
                  value: 15,
                  message: "Maximum Password Length is 15",
                },
              })}
            />
          </div>
          <p className="mt-4 text-white">
            You Already Have Account ?{" "}
            <Link href="/LoginAdmin" className="hover:text-blue">
              Login
            </Link>
          </p>
          <button type="submit">
            {loading ? (
              <div className="flex gap-2 justify-center">
                <Loading width={25} height={25} border="2px solid #fff" />{" "}
                Loading...
              </div>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
      </main>
      <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
    </>
  );
}
