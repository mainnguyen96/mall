import axios from "axios";

const baseURL =
  "https://mall-eb5e9-default-rtdb.asia-southeast1.firebasedatabase.app/";

export const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 1000,
});

export const getService = async (path) => {
  let data;
  await axiosInstance.get(`${path}.json`).then((res) => {
    data = res.data;
  });
  return data;
};
