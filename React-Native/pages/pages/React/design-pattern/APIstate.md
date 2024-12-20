### API state

```jsx
import { Fragment, useCallback, useEffect, useState } from "react";
import { fetchUsers } from "../api/usersApi";

type User = {
  id: number;
  email: string;
  name: string;
};

const useFetchUsers = () => {
  const [users, setUsers] = useState<User[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const initFetchUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetchUsers();
      setUsers(response.data);
      setIsLoading(false);
    } catch (e) {
      const Error = e as Error;
      setError(Error.message);
    }
  }, []);

  return {
    users,
    isLoading,
    error,
    initFetchUsers,
  };
};

export const Users = () => {
  const { users, error, isLoading, initFetchUsers } = useFetchUsers();

  useEffect(() => {
    initFetchUsers();
  }, [initFetchUsers]);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      {isLoading
        ? null
        : users &&
          users.map((user) => {
            return (
              <Fragment key={user.id}>
                <h3>{user.name}</h3>
                <h3>{user.email}</h3>
              </Fragment>
            );
          })}
    </>
  );
};
```

---

- 사용자에게 항상 사용자가 바생시킨 이벤트에 대한 피드백이 있어야 한다.
- 그러나 이렇게 상태를 추가하면 할 수록, 많은 조건문이 발생하고 복잡해진다.

```jsx
import { Fragment, useCallback, useEffect, useState } from "react";
import { fetchUsers } from "../api/usersApi";

type User = {
  id: number;
  email: string;
  name: string;
};

type ApiStatus = "IDLE" | "PENDING" | "SUCCESS" | "ERROR";

const useFetchUsers = () => {
  const [users, setUsers] = useState<User[]>();
  const [apiStatus, setApiStatus] = useState<ApiStatus>("IDLE");

  const initFetchUsers = useCallback(async () => {
    setApiStatus("PENDING");
    try {
      const response = await fetchUsers();
      setUsers(response.data);
      setApiStatus("SUCCESS");
    } catch {
      setApiStatus("ERROR");
    }
  }, []);

  return {
    users,
    apiStatus,
    initFetchUsers,
  };
};

export const Users = () => {
  const { users, apiStatus, initFetchUsers } = useFetchUsers();

  useEffect(() => {
    initFetchUsers();
  }, [initFetchUsers]);

  if (apiStatus === "ERROR") {
    return <p>Error occurred</p>;
  }

  return (
    <>
      {apiStatus === "PENDING"
        ? null
        : apiStatus === "SUCCESS" &&
          users &&
          users.map((user) => {
            return (
              <Fragment key={user.id}>
                <h3>{user.name}</h3>
                <h3>{user.email}</h3>
              </Fragment>
            );
          })}
    </>
  );
};

```

- api 상태 통합

---

#### try ... catch 분리

```jsx
// ... helper/with-api
import { AxiosResponse } from "axios";

export async function withAsync(fn: () => Promise<AxiosResponse<any, any>>) {
  try {
    if (typeof fn !== "function") {
      throw new Error("The argument must be function");
    }

    const { data } = await fn();

    return {
      response: data,
      error: null,
    };
  } catch (error) {
    return {
      error,
      response: null,
    };
  }
}
```

```jsx
// ... user
import { Fragment, useCallback, useEffect, useState } from "react";
import { fetchUsers } from "../api/usersApi";
import { withAsync } from "../helper/with-async";

type User = {
  id: number;
  email: string;
  name: string;
};

type ApiStatus = "IDLE" | "PENDING" | "SUCCESS" | "ERROR";

const useFetchUsers = () => {
  const [users, setUsers] = useState<User[]>();
  const [apiStatus, setApiStatus] = useState<ApiStatus>("IDLE");

  const initFetchUsers = useCallback(async () => {
    setApiStatus("PENDING");
    const { response, error } = await withAsync(fetchUsers);

    if (error) {
      setApiStatus("ERROR");
    }

    if (response) {
      setApiStatus("SUCCESS");
      setUsers(response);
    }
  }, []);

  return {
    users,
    apiStatus,
    initFetchUsers,
  };
};

export const Users = () => {
  const { users, apiStatus, initFetchUsers } = useFetchUsers();

  useEffect(() => {
    initFetchUsers();
  }, [initFetchUsers]);

  if (apiStatus === "ERROR") {
    return <p>Error occurred</p>;
  }

  return (
    <>
      {apiStatus === "PENDING"
        ? null
        : apiStatus === "SUCCESS" &&
          users &&
          users.map((user) => {
            return (
              <Fragment key={user.id}>
                <h3>{user.name}</h3>
                <h3>{user.email}</h3>
              </Fragment>
            );
          })}
    </>
  );
};

```

---

#### 요즘 간과한 것

- 우리는 개발 중이라 이벤트를 발생시켰을 때, 현재 동작하고 있는 것을 알 수 있다.
- 그러나 사용자는 다르다.
- 동작에 있어서 항상 피드백이 있어야 한다.
- 그렇지 않으면 사용자는 사이트가 멈추거나 다운된 줄 안다.
- 모든 동작에 대한 피드백을 항상 염두에 둬야겠다.
