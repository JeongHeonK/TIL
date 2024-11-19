### localStorage

- 기존 컴포넌트 재사용해서 localStorage 연결하기

```tsx
import { Props, UserInfo } from "./Components/Server/user-info";
import { DataSourceWithRender } from "./Components/DataSourceWithRender";
import axios from "axios";
import { DataSourceLoader } from "./Components/DataSourceLoader";

const getDataFromServer = async (url: string) => {
  const response = await axios.get(url);

  return response.data;
};

const getDataFromLocalStorage = (key: string) => () => {
  return localStorage.getItem(key);
};

const Message = ({ msg }: { msg?: string }) => <h1>{msg}</h1>;

function App() {
  return (
    <main style={{ width: "100%" }}>
      <DataSourceWithRender
        getData={() => getDataFromServer("someUrl")}
        render={(resource: Props["user"]) => <UserInfo user={resource} />}
      />

      <DataSourceLoader
        getData={getDataFromLocalStorage("test")}
        resourceName="msg"
      >
        <Message />
      </DataSourceLoader>
    </main>
  );
}

export default App;
```
