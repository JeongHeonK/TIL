import axios from "axios";

const axiosParams = {
  baseURL: import.meta.env.PROD ? "http://localhost:3000" : "/",
};

const axiosInstance = axios.create(axiosParams);

type customError = { aborted: boolean } & Error;

export const didAbort = (error: customError) =>
  axios.isCancel(error) && { aborted: true };

const getCancelSource = () => axios.CancelToken.source();

// export const isApiError =  axios.isAxiosError(error);

const withAbort = (fn: (...args: any[]) => any) => {
  const executor = async (...args: any[]) => {
    const originalConfig = args.at(-1);
    const { abort, ...config } = originalConfig;

    if (typeof abort === "function") {
      const { cancel, token } = getCancelSource();
      config.CancelToken = token;
      abort(cancel);
    }

    try {
      if (args.length > 2) {
        const [url, body] = args;
        return await fn(url, body, config);
      } else {
        const [url] = args;
        return await fn(url, config);
      }
    } catch (err) {
      const error = err as customError;
      if (didAbort(error)) {
        error.aborted = true;
      }

      throw error;
    }
  };

  return executor;
};

const api = (axios: typeof axiosInstance) => {
  return {
    get: (url: string, config = {}) => withAbort(axios.get)(url, config),
    delete: (url: string, config = {}) => withAbort(axios.delete)(url, config),
    post: (url: string, config = {}) => withAbort(axios.post)(url, config),
    patch: (url: string, config = {}) => withAbort(axios.patch)(url, config),
    put: (url: string, config = {}) => withAbort(axios.put)(url, config),
  };
};

export default api(axiosInstance);
