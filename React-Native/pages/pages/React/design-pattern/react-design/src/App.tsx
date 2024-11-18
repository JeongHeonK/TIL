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
