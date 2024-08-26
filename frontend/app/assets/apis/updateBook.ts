import { Book, mainUrl } from "../data/data";

export const updateBookApi = async (
  token: string,
  id: string,
  bookId: string,
  data: Book
) => {
  const response = await fetch(mainUrl + "/update-book/" + bookId, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
      id: id,
    },
    body: JSON.stringify(data),
    mode: "cors",
  });
  return response;
};
