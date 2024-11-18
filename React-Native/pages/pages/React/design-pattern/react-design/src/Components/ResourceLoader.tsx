import React, { ReactNode, useEffect, useState } from "react";
import axios from "axios";

type Props = {
  resourcePath: string;
  resourceName?: string;
  children: ReactNode;
};

export const ResourceLoader = ({
  resourcePath,
  resourceName,
  children,
}: Props) => {
  const [resource, setResource] = useState<object>({});

  useEffect(() => {
    (async () => {
      const response = await axios.get(`someUrl/${resourcePath}`);

      setResource(response.data);
    })();
  }, [resourcePath]);

  return (
    <>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && resourceName) {
          return React.cloneElement(child, { [resourceName]: resource });
        }

        return child;
      })}
    </>
  );
};
