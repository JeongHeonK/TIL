import { useEffect, useState } from "react";

export const useDataSource = (getData: (...args: any[]) => Promise<any>) => {
  const [resource, setResource] = useState({});

  useEffect(() => {
    (async () => {
      const data = await getData();
      setResource(data?.data);
    })();
  }, [getData]);

  return resource;
};
