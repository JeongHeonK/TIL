### DataSourceLoader

```tsx
import React, { ReactNode, useEffect, useState } from "react";

type GetData = <T>(url: string) => Promise<T>;

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
```

사용

```tsx
import { UserInfo } from "./Components/Server/user-info";
import { DataSourceLoader } from "./Components/DataSourceLoader";
import axios from "axios";

const getDataFromServer = async (url: string) => {
  const response = await axios.get(url);

  return response.data;
};

function App() {
  return (
    <main style={{ width: "100%" }}>
      <DataSourceLoader
        getData={() => getDataFromServer("someUrl")}
        resourceName="user"
      >
        <UserInfo
          user={{ name: "hey", age: 30, country: "ja", books: ["oh", "hey"] }}
        />
      </DataSourceLoader>
    </main>
  );
}

export default App;
```
