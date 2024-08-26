import { mainUrl } from "../data/data";

export const loginAdminApi: Function = async (data: object): Promise<any> => {
  const response = await fetch(mainUrl + "/sign-in-admin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    mode: "cors",
  });
  return response;
};
