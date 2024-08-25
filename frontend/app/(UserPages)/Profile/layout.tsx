"use client";
import React from "react";
import ProfileSidebar from "../../../components/ProfileSidebar";
import { ToastContainer } from "react-toastify";
import { usePathname } from "next/navigation";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const array = pathname.split("/");
  return (
    <main className="profile-layout p-4">
      <div className="container max-w-full">
        <ProfileSidebar />
        <div
          className={`profile-col-2 ${
            array.includes("Orders") && "overflow-x-hidden"
          } flex flex-col`}
        >
          <div className="head-col-2 mb-4">
            <h1>{!array[2] ? "Favorites" : array[2]}</h1>{" "}
          </div>
          <div className="profile-body flex flex-col justify-between grow">
            {children}
          </div>
        </div>
      </div>
      <ToastContainer pauseOnFocusLoss={false} pauseOnHover={false} />
    </main>
  );
}
