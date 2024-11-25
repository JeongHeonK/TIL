### useResource.md

```jsx
import axios from "axios";
import { useEffect, useState } from "react";

export const useResource = (resourceUrl: string) => {
  const [resource, setResource] = useState({});

  useEffect(() => {
    (async () => {
      const response = await axios.get(resourceUrl);
      setResource(response?.data);
    })();
  }, [resourceUrl]);

  return resource;
};
```

사용

```jsx
import { useResource } from "../CustomHooks/resource.hook";

export type Props = {
  user: { name: string; age: number; country: string; books: string[] };
};

export const UserInfo = ({ userId }: { userId: string }) => {
  const user = useResource(`users/${userId}`) as Props["user"];
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

---

- HOCs보다 훨씬 간편한 느낌이 든다.
- 같이 협업해야 하는 관점에서라면 Custom hook을 더 많이 사용할 것 같다.
