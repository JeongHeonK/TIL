import axios from "axios";
import { useEffect, useState } from "react";

export const useUsers = (userId: string) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    (async () => {
      const response = await axios.get(`users/${userId}`);
      setUser(response?.data);
    })();
  }, [userId]);

  return user;
};
