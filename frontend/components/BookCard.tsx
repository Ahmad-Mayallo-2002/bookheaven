import React from "react";
import AOS from "aos";
import { Book } from "../app/assets/data/data";
import Link from "next/link";

export default function BookCard({
  bookData,
  index,
}: {
  bookData: Book;
  index: number;
}) {
  const { url, title, price, language, author, _id } = bookData;
  React.useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      <div
        data-aos="fade-up"
        data-aos-delay={`${index * 100}`}
        className="book-card"
      >
        <div className="card-head">
          <img src={url} alt="Book Image" width={0} height={0} />
        </div>
        <div className="card-body">
          <h3>{title}</h3>
          <p>{author}</p>
          <div className="price-lang">
            <p>{price}$</p>
            <p>{language}</p>
          </div>
          <Link href={`/Book/${_id}`} className="single-book-link">
            More
          </Link>
        </div>
      </div>
    </>
  );
}
