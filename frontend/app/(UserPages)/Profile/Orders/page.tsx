"use client";
import React from "react";
import getLocalStorageData, {
  Book,
  ErrorMessage,
  mainUrl,
} from "../../../assets/data/data";
import AOS from "aos";
import { deleteRequests } from "../../../assets/apis/deleteRequests";
import { toast } from "react-toastify";
import { getRequests } from "../../../assets/apis/getRequests";
import Loading from "../../../loading";

export default function Order() {
  const date = new Date();
  const userData = getLocalStorageData();
  const [loading, setLoading] = React.useState(false);
  const [orders, setOrders] = React.useState<Array<Book> | any>([]);
  const getData = async () => {
    try {
      setLoading(true);
      const response = await getRequests(
        userData?.token,
        userData?.id,
        "/get-orders",
        orders.length
      );
      const result = await response.json();
      setOrders(result);
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
  const handleCancelOrder = async (bookId: string) => {
    const response = await deleteRequests(
      userData?.token,
      userData?.id,
      mainUrl + "/cancel-order",
      bookId
    );
    const result = await response.json();
    if (response.status === 200) {
      getData();
      toast.success(result?.msg);
    }
    if (response.status === 400) toast.info(result?.msg);
  };
  const handleClearOrders = async () => {
    const response = await deleteRequests(
      userData?.token,
      userData?.id,
      mainUrl + "/clear-orders"
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
      <div className="content overflow-x-auto h-full">
        {loading ? (
          <div style={{ gridColumn: "1/-1" }}>
            <Loading width={100} height={100} border="10px solid #fff" />
          </div>
        ) : Array.isArray(orders) ? (
          <table className="h-full w-full">
            <thead>
              <tr className="font-bold">
                <th>No.</th>
                <th>Image</th>
                <th>Title</th>
                <th>Author</th>
                <th>Price</th>
                <th>Language</th>
                <th>History</th>
                <th>Active</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((book, index) => {
                const { url, title, author, price, language, _id } = book;
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <img src={url} alt="Book Image" width={100} height={75} />
                    </td>
                    <td>{title}</td>
                    <td>{author}</td>
                    <td>{price}$</td>
                    <td>{language}</td>
                    <td className="min-w-[140px]">
                      {`${date.getFullYear()}-${
                        Number(date.getMonth()) + 1
                      }-${date.getDate()}`}
                    </td>
                    <td className="text-center">
                      <button
                        className="danger-button min-w-[140px]"
                        onClick={() => handleCancelOrder(_id)}
                      >
                        Cancel Order
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <h2>{orders?.msg}</h2>
        )}
      </div>
      <button className="danger-button w-full mt-4" onClick={handleClearOrders}>
        Cancel All Orders
      </button>
    </>
  );
}
