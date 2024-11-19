### DataSourceWithRender

- 기존 패턴의 경우 어디서 데이터를 전달받는지 동료개발자가 혼동할 수 있음.
- `Loader component`에 render함수를 사용하여 추적하기 싶도록 전환가능

```tsx
import { useEffect, useState } from "react";
import { Props as User } from "./Server/user-info";

type GetData = <T>() => Promise<T>;

type Props = {
  getData: GetData;
  render: (resource: User["user"]) => JSX.Element;
};

export const DataSourceWithRender = ({ getData, render }: Props) => {
  const [resource, setResource] = useState<User["user"]>();

  useEffect(() => {
    (async () => {
      const data = await getData<User["user"]>();

      setResource(data);
    })();
  }, [getData]);

  if (resource) {
    return render(resource);
  }

  return null;
};
```

사용

```tsx
import { Props, UserInfo } from "./Components/Server/user-info";
import { DataSourceWithRender } from "./Components/DataSourceWithRender";
import axios from "axios";

const getDataFromServer = async (url: string) => {
  const response = await axios.get(url);

  return response.data;
};

function App() {
  return (
    <main style={{ width: "100%" }}>
      <DataSourceWithRender
        getData={() => getDataFromServer("someUrl")}
        render={(resource: Props["user"]) => <UserInfo user={resource} />}
      />
    </main>
  );
}

export default App;
```

- 그러나 18버전 이후로 `render` 함수는 `createRoot` 함수로 교체됨
