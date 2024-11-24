import axios from "axios";
import { useState, useEffect, ComponentType } from "react";

export const includeUser = (Component: ComponentType<any>, userId: string) => {
  return (props: object) => {
    const [user, setUser] = useState<object>();

    useEffect(() => {
      (async () => {
        const data = await axios.get(`someURL/${userId}`);
        setUser(data);
      })();
    });

    return <Component {...props} user={user} />;
  };
};
