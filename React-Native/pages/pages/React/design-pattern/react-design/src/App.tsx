import { UserInfo } from "./Components/Server/user-info";
import { UserLoader } from "./Components/UserLoader";

function App() {
  return (
    <main style={{ width: "100%" }}>
      <UserLoader userId="dummyId">
        <UserInfo
          user={{ name: "hey", age: 30, country: "ja", books: ["oh", "hey"] }}
        />
      </UserLoader>
    </main>
  );
}

export default App;
