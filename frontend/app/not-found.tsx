import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div className="w-[100vw] gap-4 h-[100vh] flex justify-center items-center flex-col">
      <h1 className="text-yellow font-bold text-5xl">404 Error Not Found</h1>
      <p className="text-white text-2xl">
        Return To{" "}
        <Link href="/" className="hover:text-blue">
          Home Page
        </Link>
      </p>
    </div>
  );
}
