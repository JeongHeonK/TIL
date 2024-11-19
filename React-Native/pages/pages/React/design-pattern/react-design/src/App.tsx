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
