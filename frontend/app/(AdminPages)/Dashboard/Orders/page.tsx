"use client";
import React, { useEffect, useState } from "react";
import getLocalStorageData, {
  defaultUserImage,
  Order,
} from "../../../assets/data/data";
import { getRequests } from "../../../assets/apis/getRequests";
import Loading from "../../../loading";

export default function Orders() {
  const userData = getLocalStorageData();
  const [data, setData] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const getData = async () => {
    try {
      setLoading(true);
      const response = await getRequests(
        userData?.token,
        userData?.id,
        "/get-orders-history"
      );
      const result = await response.json();
      console.log(result);
      setData(result);
    } catch (error) {
      setLoading(false);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <div className="dashboard-head">
        <h3>Orders</h3>
      </div>
      <div
        className={` orders grow  ${
          loading ? "flex items-center justify-center" : "grid gap-4"
        }`}
      >
        {loading ? (
          <Loading width={125} height={125} border="5px solid #fff" />
        ) : data.length === 0 ? (
          <h1 className="font-bold text-4xl flex items-center justify-center h-full">
            There is No Order
          </h1>
        ) : (
          data?.map((order, index) => {
            const { user, book } = order;
            return (
              <div className="order" key={index}>
                <figure className="h-[300px] head">
                  <img
                    src={book.url}
                    className="max-w-[100%] w-full h-full"
                    alt=""
                  />
                </figure>
                <div className="body text-center p-4 grid gap-2">
                  <img
                    className="avatar mx-auto"
                    width={75}
                    src={user.avatar || defaultUserImage}
                    alt=""
                  />
                  <p>{user.username} Orders</p>
                  <p className="h-[50px]">{book.title}</p>
                  <p>${book.price}</p>
                  <p>{book.createdAt.split("T")[0]}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
}
