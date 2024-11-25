import axios from "axios";
import { useEffect, useState } from "react";

export const useUser = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    (async () => {
      const response = await axios.get("userURL");
      setUser(response?.data);
    })();
  }, []);

  return user;
};
