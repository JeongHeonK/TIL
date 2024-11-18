### DataSourceLoader

```tsx
import React, { ReactNode, useEffect, useState } from "react";

type GetData = <T>() => Promise<T>;

type Props = {
  getData: GetData;
  resourceName?: string;
  children: ReactNode;
};

export const DataSource = ({ getData, resourceName, children }: Props) => {
  const [resource, setResource] = useState<object>({});

  useEffect(() => {
    (async () => {
      const data = await getData<{ user: "hi" }>();

      setResource(data);
    })();
  }, [getData]);

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
```
