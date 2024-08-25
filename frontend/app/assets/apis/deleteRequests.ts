export const deleteRequests = async (
  token: string,
  id: string,
  url: string,
  objectID: string = ""
) => {
  const response = await fetch(`${url}/${objectID}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
      id: id,
    },
  });
  return response;
};
