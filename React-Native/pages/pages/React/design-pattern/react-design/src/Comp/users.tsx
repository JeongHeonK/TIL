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
