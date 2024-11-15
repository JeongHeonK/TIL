import React, { ReactNode, useEffect, useState } from "react";
import axios from "axios";

type Props = {
  children: ReactNode;
};

export const CurrentUserLoader = ({ children }: Props) => {
  const [user, setUser] = useState<object>({});

  useEffect(() => {
    (async () => {
      const response = await axios.get("someUrl");

      setUser(response.data);
    })();
  }, []);

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
