import { AxiosResponse } from "axios";

export async function withAsync(fn: () => Promise<AxiosResponse<any, any>>) {
  try {
    if (typeof fn !== "function") {
      throw new Error("The argument must be function");
    }

    const { data } = await fn();

    return {
      response: data,
      error: null,
    };
  } catch (error) {
    return {
      error,
      response: null,
    };
  }
}
