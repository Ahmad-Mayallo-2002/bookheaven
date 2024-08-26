import { mainUrl } from "../data/data";

export const getRequests = async (
  token: string,
  id: string,
  url: string,
  limit: number = 1,
  objectId: string = "",
  skip: number = 0
) => {
  const response = await fetch(
    mainUrl + url + objectId + `?limit=${limit}&skip=${skip}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
        id: id,
      },
      mode: "cors",
    }
  );
  return response;
};
