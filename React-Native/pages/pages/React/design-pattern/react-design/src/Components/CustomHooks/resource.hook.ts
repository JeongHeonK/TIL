import axios from "axios";
import { useEffect, useState } from "react";

export const useResource = (resourceUrl: string) => {
  const [resource, setResource] = useState({});

  useEffect(() => {
    (async () => {
      const response = await axios.get(resourceUrl);
      setResource(response?.data);
    })();
  }, [resourceUrl]);

  return resource;
};
