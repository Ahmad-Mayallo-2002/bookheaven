"use client";
import React, { useState } from "react";
import getLocalStorageData, { mainUrl } from "../../assets/data/data";
import { Book } from "../../assets/data/data";
import Loading from "../../loading";
import { deleteRequests } from "../../assets/apis/deleteRequests";
import { toast, ToastContainer } from "react-toastify";
import Link from "next/link";
import { getRequests } from "../../assets/apis/getRequests";

export default function page() {
  const userData = getLocalStorageData();
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState<Array<Book>>();
  const [skipValue, setSkipValue] = useState(0);
  const limitValue: number = 6;
  const handleNext = async () => {
    setSkipValue((prevSkipValue) => {
      const newSkipValue = prevSkipValue + 6;
      getData(newSkipValue); // Pass the updated skipValue to getData
      return newSkipValue;
    });
  };
  const handlePrevious = () => {
    setSkipValue((prevSkipValue) => {
      if (prevSkipValue === 0) {
        getData(0);
        return 0;
      }
      const newSkipValue = prevSkipValue - 6;
      getData(newSkipValue); // Pass the updated skipValue to getData
      return newSkipValue;
    });
  };
  const getData = async (skipValue: number) => {
    try {
      setLoading(true);
      const response = await getRequests(
        userData?.token,
        userData?.id,
        "/all-books",
        limitValue,
        "",
        skipValue
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
  React.useEffect(() => {
    getData(skipValue);
  }, []);
  const handleClickDelete = async (bookId: string) => {
    try {
      const response = await deleteRequests(
        userData?.token,
        userData?.id,
        mainUrl + "/delete-book",
        bookId
      );
      const result = await response.json();
      if (response.status === 200) {
        getData(skipValue);
        toast.success(result?.msg);
      }
      if (response.status === 400) toast.error(result?.msg);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="dashboard-head">
        <h3>All Books</h3>
      </div>
      <div
        className={`all-books grow ${
          loading ? "flex justify-center items-center" : "grid gap-4"
        }`}
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          alignContent: "start",
        }}
      >
        {loading ? (
          <Loading width={150} border="10px solid #fff" height={150} />
        ) : (
          books?.map((book) => (
            <div className="card h-fit" key={book._id}>
              <img
                src={book.url}
                className="w-full h-[400px]"
                alt="Book Image"
              />
              <div className="card-body text-center">
                <h3 className="my-4 font-bold h-[50px]">{book.title}</h3>
                <p>Author: {book.author}</p>
                <p>Language: {book.language}</p>
                <p>Price: {book.price}</p>
              </div>
              <div className="options mt-4 flex justify-between">
                <button
                  className="danger-button"
                  onClick={() => handleClickDelete(book._id)}
                >
                  Delete Book
                </button>
                <Link
                  className="primary-button"
                  href={`/Dashboard/${book?._id}`}
                >
                  Update Book
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="next-prev mt-4 flex justify-between">
        <button onClick={handlePrevious} id="prev" className="primary-button">
          Previous
        </button>
        <button onClick={handleNext} id="next" className="primary-button">
          Next
        </button>
      </div>
      <ToastContainer pauseOnFocusLoss={false} pauseOnHover={false} />
    </>
  );
}
