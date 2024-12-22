import { useState } from "react";

type ApiStatus = "IDLE" | "PENDING" | "SUCCESS" | "ERROR";

interface Config {
  initialData?: object[];
}

export function useApi<T>(
  fn: (...args: any[]) => Promise<T[]>,
  config?: Config
) {
  const [data, setData] = useState<T[]>();
  const [error, setError] = useState("");
  const [status, setStatus] = useState<ApiStatus>();

  const exec = async (...args: any[]) => {
    try {
      setStatus("PENDING");
      const data = await fn(...args);
      setData(data);
      setStatus("SUCCESS");
      return {
        response: data,
        error: null,
      };
    } catch (error) {
      const fetchError = error as Error;
      setError(fetchError.message);
      setStatus("ERROR");
      return {
        error,
        response: null,
      };
    }
  };

  return {
    data,
    setData,
    status,
    setStatus,
    exec,
  };
}
