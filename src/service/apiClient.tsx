import axios from "axios";
import { fetchAuthSession } from "aws-amplify/auth";

const axiosClient = axios.create({
  baseURL: "https://9qtpgjz1x3.execute-api.ap-southeast-1.amazonaws.com",
  headers: {
    "content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(async (config) => {
  const session = await fetchAuthSession();
  console.log(session);

  config.headers.Authorization = `Bearer ${session.tokens?.accessToken}`;
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  (error) => {
    throw error;
  }
);

export default axiosClient;
