import axiosClient from "../../axios/config";

export const updateShowOptions = async (field: string, status: boolean) => {
  const url = `/api/users/showOption/${field}`;
  return await axiosClient.put(url, { [field]: status });
};
