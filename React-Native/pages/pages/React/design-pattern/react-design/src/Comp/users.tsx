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

  switch (apiStatus) {
    case "IDLE":
      return null;
    case "PENDING":
      return <LazyLoader show={apiStatus === "PENDING"} delay={500} />;
    case "ERROR":
      return <p>Error occurred</p>;
    case "SUCCESS":
      return (
        <>
          {users?.map((user) => {
            return (
              <Fragment key={user.id}>
                <h3>{user.name}</h3>
                <h3>{user.email}</h3>
              </Fragment>
            );
          })}
        </>
      );
  }
};

const LazyLoader = ({ show = false, delay = 0, defaultValue = "fetching" }) => {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    let timeout: number;

    if (!show) {
      setShowLoader(false);
      return;
    }

    if (delay === 0) {
      setShowLoader(true);
    } else {
      timeout = setTimeout(() => setShowLoader(true), delay);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [show, delay]);

  return showLoader ? "Loading..." : defaultValue;
};
