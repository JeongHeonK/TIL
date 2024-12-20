import axios from "axios";

const axiosParams = {
  baseURL: import.meta.env.PROD ? "http://localhost:3000" : "/",
};

const axiosInstance = axios.create(axiosParams);

const api = (axios: typeof axiosInstance) => {
  return {
    get: (url: string, config = {}) => axios.get(url, config),
    delete: (url: string, config = {}) => axios.delete(url, config),
    post: (url: string, config = {}) => axios.post(url, config),
    patch: (url: string, config = {}) => axios.patch(url, config),
    put: (url: string, config = {}) => axios.put(url, config),
  };
};

export default api(axiosInstance);
