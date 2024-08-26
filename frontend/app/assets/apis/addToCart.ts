import { mainUrl } from "../data/data";

export const addToCartApi = async (
  token: string,
  id: string,
  bookId: string
) => {
  const addToCart = await fetch(mainUrl + `/add-cart/${bookId}`, {
    method: "PUT",
    headers: {
      authorization: `Bearer ${token}`,
      id: id,
    },
    mode: "cors",
  });
  return addToCart;
};
