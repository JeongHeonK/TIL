import { CurrentUserLoader } from "./Components/CurrentUserLoader";
import { UserInfo } from "./Components/Server/user-info";

function App() {
  return (
    <main style={{ width: "100%" }}>
      <CurrentUserLoader>
        <UserInfo
          user={{ name: "hey", age: 30, country: "ja", books: ["oh", "hey"] }}
        />
      </CurrentUserLoader>
    </main>
  );
}

export default App;
