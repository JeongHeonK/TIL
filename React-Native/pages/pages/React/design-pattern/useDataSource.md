### useDataSource

```jsx
import { useEffect, useState } from "react";

export const useDataSource = (getData: (...args: any[]) => Promise<any>) => {
  const [resource, setResource] = useState({});

  useEffect(() => {
    (async () => {
      const data = await getData();
      setResource(data?.data);
    })();
  }, [getData]);

  return resource;
};
```

사용

```jsx
import axios from "axios";
import { useDataSource } from "../CustomHooks/data-source.hook";
import { useCallback } from "react";

export type Props = {
  user: { name: string; age: number; country: string; books: string[] };
};

const fetchFromServer = (resourceUrl: string) => async () => {
  const res = await axios.get(resourceUrl);
  return res?.data;
};

export const UserInfo = ({ userId }: { userId: string }) => {
  const fetchUser = useCallback(fetchFromServer(`/user/${userId}`), [userId]);

  const user = useDataSource(fetchUser) as Props["user"];
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

- 함수로 일급객체이기에 매번 재생성되면 useHook내부에서 useEffect가 리렌더링을 유발함.
- 그래서 useCallback 사용해줘야 함.
