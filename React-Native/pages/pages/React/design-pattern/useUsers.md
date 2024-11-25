### useUsers

```jsx
import axios from "axios";
import { useEffect, useState } from "react";

export const useUsers = (userId: string) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    (async () => {
      const response = await axios.get(`users/${userId}`);
      setUser(response?.data);
    })();
  }, [userId]);

  return user;
};
```

사용

```jsx
import { useUsers } from "../CustomHooks/useUsers";

export type Props = {
  user: { name: string; age: number; country: string; books: string[] };
};

export const UserInfo = ({ userId }: { userId: string }) => {
  const user = useUsers(userId) as Props["user"];
  const { name, age, country, books } = user || {};
  return user ? (
    <>
      <h2>{name}</h2>
      <p>Age: {age} years</p>
      <p>Country: {country}</p>
      <h2>Books</h2>
      <ul>
        {books.map((book) => (
          <li key={book}>{book}</li>
        ))}
      </ul>
    </>
  ) : (
    <h1>Loading...</h1>
  );
};
```

- userId를 부모 컴포넌트에서 관리할지 컴포넌트내에서 직접 관리할지는 개발자 선택
- 여러 유저를 부른다면 부모 컴포넌트에서 제어하는 것이 좀 더 효과적

```jsx
const Parent = () => {
  return (
    <>
      <UserInfo userId={"1"} />
      <UserInfo userId={"2"} />
      <UserInfo userId={"3"} />
    </>
  );
};
```
