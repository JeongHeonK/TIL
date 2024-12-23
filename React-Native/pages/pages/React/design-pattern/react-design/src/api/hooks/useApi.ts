import { useState } from "react";

type ApiStatus = "IDLE" | "PENDING" | "SUCCESS" | "ERROR";

export function useApi<T>(fn: (...args: any[]) => Promise<T[]>) {
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
    } catch (err) {
      const fetchError = err as Error;
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
