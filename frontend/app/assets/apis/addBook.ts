import { Book, mainUrl } from "../data/data";

export const addBook = async (token: string, id: string, data: Book) => {
  const response = await fetch(mainUrl + "/add-book", {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      id: id,
    },
    body: JSON.stringify(data),
    mode: "cors",
  });
  return response;
};
