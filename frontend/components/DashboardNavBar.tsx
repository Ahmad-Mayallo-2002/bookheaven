"use client";
import React from "react";
import logo from "../app/assets/images/logo.png";
import { LinkObject } from "../app/assets/data/data";
import Link from "next/link";
import book from "../app/assets/images/book.png";
import users from "../app/assets/images/users.png";
import addBook from "../app/assets/images/add book.png";
import orders from "../app/assets/images/orders.png";
import { usePathname } from "next/navigation";
import logout from "../app/assets/images/logout.png";

export default function DashboardNavBar() {
  const pathname = usePathname();
  const linksArray: LinkObject[] = [
    {
      name: "Books",
      path: "Dashboard",
      icon: book.src,
    },
    {
      name: "Add Book",
      path: "Dashboard/AddBook",
      icon: addBook.src,
    },
    {
      name: "Users",
      path: "Dashboard/Users",
      icon: users.src,
    },
    {
      name: "Orders",
      path: "Dashboard/Orders",
      icon: orders.src,
    },
  ];
  return (
    <>
      <nav className="dashboard-navbar flex flex-col justify-between max-w-[250px] w-full p-4 bg-headerColor sticky top-0 h-[100vh]">
        <div className="head">
          <img
            src={logo.src}
            className="rounded-full mx-auto max-w-[100px] w-full"
            alt="Logo"
          />
          <h3 className="text-white font-bold text-3xl text-center mt-4">
            Book Heaven
          </h3>
          <ul className="grid gap-y-4 mt-4">
            {linksArray.map((value, index) => (
              <li key={index}>
                <Link
                  href={`/${value.path}`}
                  className={`flex items-center px-4 py-3 hover:bg-bodyColor text-white ${
                    pathname.split(/^\//).includes(value.path) && "bg-bodyColor"
                  }`}
                >
                  <img
                    src={value.icon}
                    width={30}
                    style={{ marginRight: "1rem", filter: "invert(1)" }}
                    alt="Link Icon"
                  />
                  <span>{value.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <button className="danger-button">
          <Link
            href="/LoginAdmin"
            className="w-full flex items-center justify-center gap-x-3"
          >
            <img
              src={logout.src}
              width={30}
              style={{ filter: "invert(1)" }}
              alt=""
            />{" "}
            <span>Logout</span>
          </Link>
        </button>
      </nav>
    </>
  );
}
