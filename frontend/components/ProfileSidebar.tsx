"use client";
import React from "react";
import getLocalStorageData, {
  LinkObject,
  mainUrl,
  User,
} from "../app/assets/data/data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import orders from "../app/assets/images/orders.png";
import cart from "../app/assets/images/cart.png";
import favorite from "../app/assets/images/favorite.png";
import account from "../app/assets/images/account.png";
import { deleteRequests } from "../app/assets/apis/deleteRequests";
import { useRouter } from "next/navigation";
import { defaultUserImage } from "../app/assets/data/data";
import { getRequests } from "../app/assets/apis/getRequests";
import removeAccount from "../app/assets/images/remove.png";

export default function ProfileSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const iconsArray: any[] = [favorite, cart, orders, account];
  const LinksArray: LinkObject[] = [
    {
      name: "Favorites",
      path: "/Profile",
    },
    {
      name: "Cart",
      path: "/Profile/Cart",
    },
    {
      name: "Orders History",
      path: "/Profile/Orders",
    },
    {
      name: "Update Account",
      path: "/Profile/UpdateAccount",
    },
  ];
  const [user, setUser] = React.useState<User>();
  const handleClick = async () => {
    try {
      const userData = getLocalStorageData();
      const response = await deleteRequests(
        userData?.token,
        userData?.id,
        mainUrl + "/delete-user"
      );
      if (response.status === 200) router.push("/");
    } catch (error) {
      console.error(error);
    }
  };
  React.useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = getLocalStorageData();
        const response = await getRequests(
          userData?.token,
          userData?.id,
          "/user"
        );
        const result = await response.json();
        setUser(result);
      } catch (error) {
        console.error(error);
      }
    };
    getUserData();
  }, []);
  return (
    <>
      <aside className="profile-sidebar p-4 bg-headerColor flex flex-col justify-between">
        <div className="sidebar-head text-center">
          <img
            src={user?.avatar || defaultUserImage}
            alt="User Avatar"
            className="mx-auto mb-4 rounded-full max-w-[100px] w-full"
          />
          <h3 className="text-white font-bold">{user?.username}</h3>
          <hr className="my-4" />
          <h3 className="text-white font-bold mb-4">{user?.email}</h3>
        </div>
        <div className="sidebar-body">
          <ul className="grid gap-y-4">
            {LinksArray.map((link, index) => (
              <li key={index}>
                <Link
                  href={link.path}
                  className={`hover:text-blue hover:bg-bodyColor px-4 py-3 w-full flex items-center gap-x-4  ${
                    pathname === link.path
                      ? "text-blue bg-bodyColor"
                      : "text-white"
                  }`}
                >
                  <img
                    src={iconsArray[index]?.src}
                    style={{
                      filter: "invert(100%)",
                      maxWidth: "20px",
                    }}
                    alt="Icon"
                  />{" "}
                  <span>{link.name}</span>
                </Link>
              </li>
            ))}
            <li>
              <button
                className="danger-button w-full flex items-center gap-x-4"
                onClick={handleClick}
              >
                <img
                  src={removeAccount.src}
                  style={{ filter: "invert(1)" }}
                  width={30}
                  alt=""
                />
                <span>Delete Account</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}
