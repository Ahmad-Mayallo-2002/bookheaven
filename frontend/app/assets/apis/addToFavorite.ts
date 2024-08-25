import { mainUrl } from "../data/data";

export const addToFavoriteApi = async (
  token: string,
  id: string,
  bookId: string
) => {
  const addToFavorite = await fetch(mainUrl + `/add-favorite/${bookId}`, {
    method: "PUT",
    headers: {
      authorization: `Bearer ${token}`,
      id: id,
    },
  });
  return addToFavorite;
};
