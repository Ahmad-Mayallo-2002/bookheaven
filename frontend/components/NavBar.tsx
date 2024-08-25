"use client";
import React from "react";
import bars from "../app/assets/images/bars.png";
import logo from "../app/assets/images/logo.png";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LinkObject } from "../app/assets/data/data";

export default function NavBar() {
  const pathname = usePathname();
  const listRef = React.useRef<HTMLUListElement>(null);
  const handleClick = () => {
    listRef.current?.classList.toggle("height-full");
  };
  const linksArray: LinkObject[] = [
    {
      name: "Home",
      path: "/Home",
    },
    {
      name: "About Us",
      path: "/About",
    },
    {
      name: "Profile",
      path: "/Profile",
    },
  ];
  const handleClickLogout = async () => {
    if (typeof window !== "undefined")
      localStorage.removeItem("userAuthentication");
  };
  React.useEffect(() => {
    const resizeFunction = () => {
      if (window.innerWidth > 767)
        listRef.current?.classList.remove("height-full");
    };
    window.addEventListener("resize", resizeFunction);
    return () => window.removeEventListener("resize", resizeFunction);
  }, []);
  return (
    <nav className="p-4 bg-headerColor text-white">
      <div className="container flex justify-between items-center mx-auto">
        <div className="logo">
          <Link href="/Home" className="flex items-center gap-x-4">
            <Image src={logo} alt="Book Logo" className="rounded-full" />
            <h1 className="font-bold text-3xl">Book Heaven</h1>
          </Link>
        </div>
        <button className="toggle cursor-pointer" onClick={handleClick}>
          <Image
            src={bars}
            alt="Bars Icon"
            priority
            className="bars"
            style={{
              filter: "invert(100%)",
              transform: "scale(1, .75)",
              transformOrigin: "left",
            }}
          />
        </button>
        <ul
          ref={listRef}
          className="flex items-center gap-x-4 margin-top-0"
          style={{
            transition: "150ms",
          }}
        >
          {linksArray.map((link, index) => {
            const { name, path } = link;
            return (
              <li key={index}>
                <Link
                  href={path}
                  className={`hover:text-blue ${
                    pathname === path && "text-blue"
                  }`}
                >
                  {name}
                </Link>
              </li>
            );
          })}
          <li>
            <button className="auth">
              <Link href="/" onClick={handleClickLogout}>
                Logout
              </Link>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
