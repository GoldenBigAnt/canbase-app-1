import axios from "axios";
import { API_URI } from "@/config/env";
import { loadData } from "./storage";

const axiosPublicInstance = axios.create({ baseURL: API_URI });
const axiosPrivateInstance = axios.create({ baseURL: API_URI });

axiosPrivateInstance.interceptors.request.use(
  async (config) => {
    const token = await loadData("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { axiosPublicInstance, axiosPrivateInstance };
