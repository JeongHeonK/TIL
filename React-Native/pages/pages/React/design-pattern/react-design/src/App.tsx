import { UserInfo } from "./Components/Server/user-info";
import { ResourceLoader } from "./Components/SourceLoader";

function App() {
  return (
    <main style={{ width: "100%" }}>
      <ResourceLoader resourcePath="dummyId" resourceName="user">
        <UserInfo
          user={{ name: "hey", age: 30, country: "ja", books: ["oh", "hey"] }}
        />
      </ResourceLoader>
    </main>
  );
}

export default App;
