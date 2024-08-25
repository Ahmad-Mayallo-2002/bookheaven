import { Inter } from "next/font/google";
import "./globals.scss";
import React from "react";
import "aos/dist/aos.css";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Book Store App",
  description: "Hello To My Book Store Website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://unpkg.com/aos@2.3.1/dist/aos.css"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.className} bg-bodyColor`}>{children}</body>
    </html>
  );
}
