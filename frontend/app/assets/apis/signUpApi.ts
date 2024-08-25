import { mainUrl } from "../data/data";

interface user {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  avatar?: string;
}

export const signUpApi = async (data: user) => {
  const response = await fetch(mainUrl + "/sign-up", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response;
};
