"use client";
import React from "react";
import getLocalStorageData, {
  Book,
  ErrorMessage,
  mainUrl,
} from "../../assets/data/data";
import AOS from "aos";
import { addToCartApi } from "../../assets/apis/addToCart";
import { toast, ToastContainer } from "react-toastify";
import { deleteRequests } from "../../assets/apis/deleteRequests";
import { getRequests } from "../../assets/apis/getRequests";
import Loading from "../../loading";

export default function Profile() {
  const userData = getLocalStorageData();
  const [favorites, setFavorites] = React.useState<
    Array<Book> | ErrorMessage
  >();
  const [loading, setLoading] = React.useState(false);
  const getData = async () => {
    try {
      setLoading(true);
      const response = await getRequests(
        userData?.token,
        userData?.id,
        "/get-favorites"
      );
      const result = await response.json();
      setFavorites(result);
    } catch (error) {
      setLoading(false);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => {
    AOS.init();
    getData();
  }, []);
  const handleAddCart = async (bookId: string) => {
    try {
      const response = await addToCartApi(
        userData?.token,
        userData?.id,
        bookId
      );
      const result = await response.json();
      if (response.status === 200) toast.success(result?.msg);
      if (response.status === 400) toast.info(result?.msg);
    } catch (error) {
      console.error(error);
    }
  };
  const handleDeleteFavoriteBook = async (bookId: string) => {
    const response = await deleteRequests(
      userData?.token,
      userData?.id,
      mainUrl + `/delete-favorite`,
      bookId
    );
    const result = await response.json();
    if (response.status === 200) {
      getData();
      toast.success(result?.msg);
    }
    if (response.status === 400) toast.info(result?.msg);
  };
  const handleClearFavoriteBooks = async () => {
    const response = await deleteRequests(
      userData?.token,
      userData?.id,
      mainUrl + "/clear-favorites"
    );
    const result = await response.json();
    if (response.status === 200) {
      getData();
      toast.success(result?.msg);
    }
    if (response.status === 400) toast.info(result?.msg);
  };
  return (
    <>
      <div className="favorites-orders-books">
        {loading ? (
          <div style={{ gridColumn: "1/-1" }}>
            <Loading width={100} height={100} border="10px solid #fff" />
          </div>
        ) : Array.isArray(favorites) === true ? (
          favorites?.map((book, index) => {
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
                  <p>{author}</p>
                  <div className="price-lang">
                    <p>{price}$</p>
                    <p>{language}</p>
                  </div>
                  <div className="options mt-4 flex justify-between flex-col md:flex-row">
                    <button
                      className="danger-outline-button"
                      onClick={() => handleDeleteFavoriteBook(_id)}
                    >
                      Delete
                    </button>
                    <button
                      className="success-outline-button"
                      onClick={() => handleAddCart(_id)}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <h2>{favorites?.msg}</h2>
        )}
      </div>
      <button
        className="danger-button mt-4 block w-full"
        onClick={handleClearFavoriteBooks}
      >
        Delete All
      </button>
      <ToastContainer pauseOnFocusLoss={false} pauseOnHover={false} />
    </>
  );
}
