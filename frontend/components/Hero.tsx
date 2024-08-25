"use client";
import React from "react";
import bookStore from "../app/assets/images/hero.png";
import Image from "next/image";
import AOS from "aos";

export default function Hero() {
  React.useEffect(() => {
    AOS.init();
  }, []);
  return (
    <section className="hero p-xy-55">
      <div className="container grid gap-4 grid-cols-1 md:grid-cols-2 m-auto overflow-x-hidden">
        <div
          className="col p-4 text-center md:text-start"
          data-aos="fade-right"
        >
          <h2 className="text-yellow font-bold text-6xl leading-[1.2] mb-4">
            Discover Your Next Great Read
          </h2>
          <p className="text-pColor">
            Uncover captivating stories, enriching knowledge, and endless
            inspiration in our curated collection of books
          </p>
          <button
            className="rounded-full font-bold text-yellow duration-200 hover:bg-yellow hover:text-black"
            style={{
              border: "2px solid #fff9d0",
              padding: "10px 40px",
              marginTop: "32px",
              fontSize: "20px",
            }}
          >
            Discover Books
          </button>
        </div>
        <div className="col p-4" data-aos="fade-left" data-aos-delay="300">
          <Image
            src={bookStore}
            height={500}
            className="mx-auto h-full md:ms-auto md:me-0"
            alt="Book Store Image"
          />
        </div>
      </div>
    </section>
  );
}
