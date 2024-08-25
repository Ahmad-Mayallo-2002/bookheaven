import { mainUrl } from "../data/data";

export const loginApi: Function = async (data: object): Promise<any> => {
  const response = await fetch(mainUrl + "/sign-in", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response;
};
