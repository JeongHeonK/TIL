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
