import { mainUrl } from "../data/data";

export const addOrder = async (token: string, id: string, bookId: string) => {
  const response = await fetch(mainUrl + "/place-order/" + bookId, {
    method: "POST",
    headers: { authorization: `Bearer ${token}`, id: id },
    mode: "cors",
  });
  return response;
};
