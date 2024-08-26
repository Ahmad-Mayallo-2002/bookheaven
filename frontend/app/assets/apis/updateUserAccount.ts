import { mainUrl } from "../data/data";

export const updateUserAccount = async (
  token: string,
  id: string,
  data: object
) => {
  const response = await fetch(mainUrl + "/update-user", {
    method: "PUT",
    headers: {
      authorization: `Bearer ${token}`,
      id: id,
      "Content-Type": "application/json",
    },
    mode: "cors",
    body: JSON.stringify(data),
  });
  return response;
};
