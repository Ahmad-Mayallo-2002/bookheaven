"use client";
import React from "react";
import { aboutData } from "../../assets/data/data";
import AOS from "aos";

export default function About() {
  React.useEffect(() => {
    AOS.init();
  }, []);
  return (
    <section className="about">
      <div className="container mx-auto p-xy-55 grid gap-y-4">
        {aboutData.map((value, index) => (
          <article
            key={index}
            data-aos="fade-up"
            data-aos-delay={`${index * 100}`}
          >
            <h3 className="text-yellow font-bold text-[3rem] mb-4">
              {value.head}
            </h3>
            <p className="text-white leading-9">{value.paragraph}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
