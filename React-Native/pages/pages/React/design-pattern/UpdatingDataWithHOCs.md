### Updating Data With HOCs

```jsx
import axios from "axios";
import { ComponentType, useEffect, useState } from "react";

export const includeUpdatableUser = (
  Component: ComponentType<any>,
  userId: string
) => {
  return (props: any) => {
    const [initialUser, setInitialUser] = useState<object>();
    const [user, setUser] = useState<object>();

    useEffect(() => {
      (async () => {
        const response = await axios.get(`someURL/${userId}`);
        setInitialUser(response?.data);
      })();
    }, []);

    const onChangeUser = (updates: object) => {
      setUser({ ...user, ...updates });
    };

    const onPostUser = async () => {
      const response = await axios.post(`someURL/${userId}`, { user });
      setInitialUser(response.data);
      setUser(response.data);
    };

    const onResetUser = () => {
      setUser(initialUser);
    };

    return (
      <Component
        {...props}
        user={user}
        onChange={onChangeUser}
        onPost={onPostUser}
        onReset={onResetUser}
      />
    );
  };
};
```

사용

```jsx
import { includeUpdatableUser } from "./include-updateable-userData";

export const UserInfoForm = includeUpdatableUser(
  ({ user, onChange, onPost, onReset }) => {
    return user ? (
      <>
        <label>
          name:
          <input
            name="name"
            type="text"
            value={user?.name}
            onChange={(e) => onChange({ userName: e.target.value })}
          />
        </label>
        <label>
          age:
          <input
            name="age"
            type="number"
            value={user?.age}
            onChange={(e) => onChange({ userAge: Number(e.target.value) })}
          />
        </label>
        <button onClick={onReset}>Reset</button>
        <button onClick={onPost}>Save</button>
      </>
    ) : (
      <h3>loading....</h3>
    );
  },
  "userid"
);

// app.tsx
import { UserInfoForm } from "./Components/HOC/user-form";

function App() {
  return (
    <main style={{ width: "100%" }}>
      <UserInfoForm />
    </main>
  );
}

export default App;
```

- HOCs를 만들면서 계속 `custom hook`으로 분리하는 것과 비슷하다는 생각을 가짐.

#### 공통점 및 차이점

1. 공통점: 코드의 재사용성을 높인다.
2. 차이점:<br />
   커스텀 훅의 경우 로직을 분리해서 재사용성을 높인다. 그러나 HOCs는 컴포넌트 자체를 재사용하고 싶을 때 사용한다.

| **항목**      | **커스텀 훅**                    | **HOC**                         |
| ------------- | -------------------------------- | ------------------------------- |
| **대상**      | 로직 재사용 (UI 독립적)          | 컴포넌트 재사용 (UI와 관련)     |
| **결과물**    | 상태와 로직 반환                 | 새로운 컴포넌트 반환            |
| **사용 방식** | 훅을 호출                        | 컴포넌트를 래핑                 |
| **주요 목적** | 상태 관리와 비즈니스 로직 캡슐화 | 컴포넌트 동작 확장 및 결과 변형 |
