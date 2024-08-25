"use client";
import React, { useEffect, useRef, useState } from "react";
import getLocalStorageData, { mainUrl, User } from "../../../assets/data/data";
import { getRequests } from "../../../assets/apis/getRequests";
import { defaultUserImage } from "../../../assets/data/data";
import { deleteRequests } from "../../../assets/apis/deleteRequests";
import { toast, ToastContainer } from "react-toastify";
import Loading from "../../../loading";

export default function Users() {
  const userData = getLocalStorageData();
  const [loading, setLoading] = useState(true);
  const [skipValue, setSkipValue] = useState(0);
  const [dataLength, setDataLength] = useState(0);
  const limitValue: number = 4;
  const nextRef: any = useRef();
  const previousRef: any = useRef();
  const [users, setUsers] = useState<User[]>([]);
  const getData = async (skipValue: number) => {
    try {
      setLoading(true);
      const response = await getRequests(
        userData?.token,
        userData?.id,
        `/all-users`,
        limitValue,
        "",
        skipValue
      );
      const result = await response.json();
      setUsers(result?.users);
      setDataLength(result?.length);
    } catch (error) {
      setLoading(false);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = async () => {
    setSkipValue((value) => {
      const nextValue = value + 4;
      getData(nextValue);
      return nextValue;
    });
  };

  const handlePrevious = async () => {
    if (skipValue === 0) {
      previousRef.current.disable = true;
    } else {
      setSkipValue((value) => {
        const previousValue = value - 4;
        getData(previousValue);
        return previousValue;
      });
    }
  };
  const handleDeleteUser = async (userId: string) => {
    const response = await deleteRequests(
      userData?.token,
      userData?.token,
      mainUrl + "/delete-user",
      userId
    );
    const result = await response.json();
    if (response.status === 200) {
      toast.success(result?.msg);
      getData(skipValue);
    }
    if (response.status !== 200) toast.info(result?.msg);
  };
  useEffect(() => {
    getData(skipValue);
  }, []);

  return (
    <>
      <div className="dashboard-head">
        <h3>Users</h3>
      </div>
      {loading ? (
        <div className="flex justify-center grow items-center">
          <Loading width={100} height={100} border="5px solid #fff" />
        </div>
      ) : users?.length === 0 ? (
        <h1 className="font-bold text-white text-4xl grow flex items-center justify-center">
          There is No Users
        </h1>
      ) : (
        <>
          <table cellPadding={15} className="font-bold">
            <thead>
              <tr>
                <td>No.</td>
                <td>Username</td>
                <td>Email</td>
                <td>Avatar</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {users?.map((user, index: number) => (
                <tr key={index}>
                  <td>{++index}</td>
                  <td>{user?.username}</td>
                  <td>{user?.email}</td>
                  <td>
                    <img
                      src={user?.avatar || defaultUserImage}
                      width={50}
                      className="rounded-full mx-auto"
                      alt="User Avatar"
                    />
                  </td>
                  <td>
                    <button
                      className="danger-button mx-auto block"
                      onClick={() => handleDeleteUser(user?._id)}
                    >
                      Delete User
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={4}>Total Users: </td>
                <td>{dataLength}</td>
              </tr>
            </tfoot>
          </table>
          <div className="flex justify-between mt-4">
            <button
              className="primary-button"
              ref={previousRef}
              onClick={handlePrevious}
            >
              Previous
            </button>
            <button
              className="primary-button"
              ref={nextRef}
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </>
      )}
      <ToastContainer pauseOnFocusLoss={false} pauseOnHover={false} />
    </>
  );
}
