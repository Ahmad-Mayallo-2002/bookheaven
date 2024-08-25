"use client";
import React from "react";
import BookCard from "./BookCard";
import getLocalStorageData from "../app/assets/data/data";
import { getRequests } from "../app/assets/apis/getRequests";
import Loading from "../app/loading";

export default function Books() {
  const [books, setBooks] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    const test = async () => {
      try {
        setLoading(true);
        const data: { token: string; id: string; role: string } =
          getLocalStorageData();
        const response = await getRequests(
          data.token,
          data.id,
          "/all-books",
          undefined,
          books.length
        );
        const result = await response.json();
        setBooks(result);
      } catch (error) {
        setLoading(false);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    test();
  }, []);
  return (
    <>
      <section className="books p-xy-55">
        <div className="container mx-auto">
          <h2 className="text-center text-yellow font-bold text-4xl mb-5">
            Books
          </h2>
          <section
            className={`books-list p-4 ${
              !loading && "grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
            }`}
          >
            {loading ? (
              <Loading width={100} height={100} border="10px solid #fff" />
            ) : (
              books.map((book, index) => (
                <BookCard
                  bookData={book}
                  key={index}
                  index={index}
                  data-aos="fade-up"
                  data-aos-delay={`${index * 100}`}
                />
              ))
            )}
          </section>
        </div>
      </section>
    </>
  );
}
