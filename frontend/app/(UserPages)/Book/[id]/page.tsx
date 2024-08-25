"use client";
import React from "react";
import getLocalStorageData from "../../../assets/data/data";
import { addToCartApi } from "../../../assets/apis/addToCart";
import { toast, ToastContainer } from "react-toastify";
import { addToFavoriteApi } from "../../../assets/apis/addToFavorite";
import { getRequests } from "../../../assets/apis/getRequests";
interface Book {
  url: string;
  title: string;
  author: string;
  desc: string;
  price: number;
  language: string;
}

export default function Book({ params }: { params: { id: string } }) {
  const [book, setBook] = React.useState<Book>();
  const [userData, setUserData] = React.useState();
  React.useEffect(() => {
    const getBookFunction = async () => {
      try {
        const data: { token: string; id: string; role: string } =
          getLocalStorageData();
        const response = await getRequests(
          data.token,
          data.id,
          "/all-books/",
          params.id
        );
        const result = await response.json();
        setBook(result);
      } catch (error) {
        console.error(error);
      }
    };
    getBookFunction();
  }, []);
  const handleClickCart = async () => {
    const data: { token: string; id: string; role: string } =
      getLocalStorageData();
    const response = await addToCartApi(data?.token, data?.id, params.id);
    const result = await response.json();
    if (response.status === 200) toast.success(`${result?.msg}`);
    if (response.status === 400) toast.info(`${result?.msg}`);
  };
  const handleClickFavorite = async () => {
    const data: { token: string; id: string; role: string } =
      getLocalStorageData();
    const response = await addToFavoriteApi(data?.token, data?.id, params.id);
    const result = await response.json();
    if (response.status === 200) toast.success(`${result?.msg}`);
    if (response.status === 400) toast.info(`${result?.msg}`);
  };
  return (
    <>
      <section className="book">
        <div className="container grid gap-4 md:grid-cols-2 grid-cols-1 p-xy-55 mx-auto">
          <div className="col bg-headerColor p-4">
            <img src={book?.url} alt="Book Image" className="w-full h-full" />
          </div>
          <div className="col bg-headerColor p-4 text-white">
            <h2 className="font-bold text-3xl mb-4">{book?.title}</h2>
            <h3 className="text-[20px] mb-4">Author: {book?.author}</h3>
            <p className="leading-[1.7] text-[20px] mb-4">
              {book?.desc} Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Impedit distinctio veniam quas libero accusamus molestiae
              perspiciatis fugit sint voluptatibus corporis nesciunt asperiores
              minus quisquam illum ut velit, consectetur nobis quis?
            </p>
            <p className="text-[20px] mb-4">Price: {book?.price}$</p>
            <div className="buttons flex gap-4">
              <button onClick={handleClickCart}>Add To Cart</button>
              <button onClick={handleClickFavorite}>Add To Favorite</button>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer pauseOnFocusLoss={false} pauseOnHover={false} />
    </>
  );
}
