### useUser

custom hook 생성

```jsx
import axios from "axios";
import { useEffect, useState } from "react";

export const useUser = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    (async () => {
      const response = await axios.get("userURL");
      setUser(response?.data);
    })();
  }, []);

  return user;
};
```

사용

```jsx
import { useUser } from "../CustomHooks/useUser";

export type Props = {
  user: { name: string; age: number; country: string; books: string[] };
};

export const UserInfo = () => {
  const user = useUser() as Props["user"];
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

- HOCs가 유용하나 사용이 그렇게 많이 안 되는지 알 것 같다.
- 일단 엄청 간편하다.
- 또한 prop을 객체로 전달할 경우 `useMemo`와 `memo`를 동시에 사용하여 항상 객체가 같은 값이라는 것을 명시해서 쓸데없는 렌더링을 방지해야 한다.
- 그런데 Custom hook을 사용하면 필요한 컴포넌트에서 Import한 상태로 바로 사용가능하기에 prop으로 전달받을 필요가 없어진다.
- 물론 custom hook은 상태를 공유하지 않기 때문에 자식 컴포넌트가 만약 같은 상태를 공유해야 한다면, prop으로 내려주거나 전역 상태 라이브러리를 사용해야 한다.
- 많이 사용되는 zustand의 경우 객체의 특정 값이 바뀔 경우 만약 그 값을 사용하지 않는다면 렌더링을 하지않도록 최적화되어 있다.(책 커스텀 훅을 통한 마이크로 상태 관리)
  - 선태자 함수를 통해 최종값을 비교하는 방식을 채택한다. `const a = useSelector(state => state.a)`
  - 이때 값이 바뀌지 않았다면 리렌더링 하지 않는다.
  - 어떤 state를 사용하는 지 사용자가 명시하므로 `수동 최적화`라고 부른다.
  - 복습
