### Load User Data With HOCs

```jsx
import axios from "axios";
import { useState, useEffect, ComponentType } from "react";

export const includeUser = (Component: ComponentType<any>, userId: string) => {
  return (props: object) => {
    const [user, setUser] = useState<object>();

    useEffect(() => {
      (async () => {
        const data = await axios.get(`someURL/${userId}`);
        setUser(data);
      })();
    });

    return <Component {...props} user={user} />;
  };
};
```

사용

```jsx
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
```

- 전에 배웠던 React.Children을 사용하는 것보다 이 방법이 훨씬 가독성이 좋아보임.
- 지금까지 항상 데이터를 처리하는 로직을 `custom hook`으로 분리하는 방법만 사용했었음.
- 그러나 그렇게 커스텀 훅으로 분리할 경우 커스텀 훅 자체가 비대해지는 부작용이 발생.
- HOCs까지 사용했다면, 책임과 역할을 분리하면서 하나의 훅이 너무 많은 로직을 처리하는 부작용을 방지 할 수 있었을 거 같음.
