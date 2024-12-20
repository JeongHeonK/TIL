### Building an Api Layer

#### layer

```js
import axios from "axios";

const axiosParams = {
  baseURL: import.meta.env.PROD ? "http://localhost:3000" : "/",
};

const axiosInstance = axios.create(axiosParams);

const api = (axios: typeof axiosInstance) => {
  return {
    get: (url: string, config = {}) => axios.get(url, config),
    delete: (url: string, config = {}) => axios.delete(url, config),
    post: (url: string, config = {}) => axios.post(url, config),
    patch: (url: string, config = {}) => axios.patch(url, config),
    put: (url: string, config = {}) => axios.put(url, config),
  };
};

export default api(axiosInstance);
```

#### instance

```js
import api from "./api";

const URLS = {
  fetchUserUrl: "users",
};

export const fetchUsers = () => {
  return api.get(URLS.fetchUserUrl, {
    baseURL: "https://jsonPlacehoder.typicode.com/",
  });
};
```

#### 컴포넌트 내 사용

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

  const initFetchUsers = useCallback(async () => {
    const response = await fetchUsers();
    setUsers(response.data);
  }, []);

  return {
    users,
    initFetchUsers,
  };
};

export const Users = () => {
  const { users, initFetchUsers } = useFetchUsers();

  useEffect(() => {
    initFetchUsers();
  }, [initFetchUsers]);

  return (
    <>
      {users
        ? users.map((user) => {
            return (
              <Fragment key={user.id}>
                <h3>{user.name}</h3>
                <h3>{user.email}</h3>
              </Fragment>
            );
          })
        : null}
    </>
  );
};
```
