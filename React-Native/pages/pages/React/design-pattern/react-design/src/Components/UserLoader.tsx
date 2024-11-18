import React, { ReactNode, useEffect, useState } from "react";
import axios from "axios";

type Props = {
  userId: string;
  children: ReactNode;
};

export const UserLoader = ({ userId, children }: Props) => {
  const [user, setUser] = useState<object>({});

  useEffect(() => {
    (async () => {
      const response = await axios.get(`someUrl/${userId}`);

      setUser(response.data);
    })();
  }, [userId]);

  return (
    <>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, user);
        }

        return child;
      })}
    </>
  );
};
