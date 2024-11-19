import React, { ReactNode, useEffect, useState } from "react";

type GetData = (<T>(url: string) => Promise<T>) | (() => string | null);

type Props = {
  getData: GetData;
  resourceName: string;
  children: ReactNode;
};

export const DataSourceLoader = ({
  getData,
  resourceName,
  children,
}: Props) => {
  const [resource, setResource] = useState<object>({});

  useEffect(() => {
    (async () => {
      const data = (await getData(resourceName)) as object;

      setResource(data);
    })();
  }, [getData, resourceName]);

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
