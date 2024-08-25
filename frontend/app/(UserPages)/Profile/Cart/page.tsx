"use client";
import React from "react";
import getLocalStorageData, {
  Book,
  ErrorMessage,
  mainUrl,
} from "../../../assets/data/data";
import AOS from "aos";
import { deleteRequests } from "../../../assets/apis/deleteRequests";
import { toast, ToastContainer } from "react-toastify";
import { addOrder } from "../../../assets/apis/addOrder";
import { getRequests } from "../../../assets/apis/getRequests";
import Loading from "../../../loading";

export default function Cart() {
  const userData = getLocalStorageData();
  const [cart, setCart] = React.useState<Array<Book> | any>([]);
  const [loading, setLoading] = React.useState(false);
  const getData = async () => {
    try {
      setLoading(true);
      const response = await getRequests(
        userData?.token,
        userData?.id,
        "/get-favorites",
        cart.length
      );
      const result = await response.json();
      setCart(result);
    } catch (error) {
      setLoading(false);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const handleClearCartBooks = async () => {
    const response = await deleteRequests(
      userData?.token,
      userData?.id,
      mainUrl + "/clear-cart"
    );
    const result = await response.json();
    if (response.status === 200) {
      getData();
      toast.success(result?.msg);
    }
    if (response.status === 400) toast.info(result?.msg);
  };
  const handleRemoveCartBook = async (bookId: string) => {
    const response = await deleteRequests(
      userData?.token,
      userData?.id,
      mainUrl + "/delete-cart",
      bookId
    );
    const result = await response.json();
    if (response.status === 200) {
      getData();
      toast.success(result?.msg);
    }
    if (response.status === 400) toast.info(result?.msg);
  };
  const handleAddOrder = async (bookId: string) => {
    const response = await addOrder(userData?.token, userData?.id, bookId);
    const result = await response.json();
    if (response.status === 200) toast.success(result?.msg);
    if (response.status === 400) toast.info(result?.msg);
  };
  React.useEffect(() => {
    AOS.init();
    getData();
  }, []);

  return (
    <>
      <div className="favorites-orders-books">
        {loading ? (
          <div style={{ gridColumn: "1/-1" }}>
            <Loading width={100} height={100} border="10px solid #fff" />
          </div>
        ) : Array.isArray(cart) ? (
          cart?.map((book, index) => {
            const { url, title, author, price, language, _id } = book;
            return (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={`${index * 100}`}
                className="book-card"
              >
                <div className="card-head">
                  <img src={url} alt="Book Image" width={0} height={0} />
                </div>
                <div className="card-body">
                  <h3>{title}</h3>
                  <p>Author: {author}</p>
                  <div className="price-lang">
                    <p>{price}$</p>
                    <p>{language}</p>
                  </div>
                  <div className="options flex justify-between mt-4 flex-col md:flex-row gap-y-4">
                    <button
                      className="danger-outline-button"
                      onClick={() => handleRemoveCartBook(_id)}
                    >
                      Delete
                    </button>
                    <button
                      className="success-outline-button"
                      onClick={() => handleAddOrder(_id)}
                    >
                      Order Now
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <h2>{cart?.msg}</h2>
        )}
      </div>
      <button
        className="danger-button mt-4 block w-full"
        onClick={handleClearCartBooks}
      >
        Delete All
      </button>
      <ToastContainer pauseOnFocusLoss={false} pauseOnHover={false} />
    </>
  );
}
