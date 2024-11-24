import { includeUser } from "./Components/HOC/include-user";
import { UserInfo } from "./Components/Server/user-info";

const UserInfoWithLoader = includeUser(UserInfo, "1123");

function App() {
  return (
    <main style={{ width: "100%" }}>
      <UserInfoWithLoader />
    </main>
  );
}

export default App;
