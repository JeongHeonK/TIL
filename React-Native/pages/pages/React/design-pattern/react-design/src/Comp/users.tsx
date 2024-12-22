import { Fragment, useEffect, useState } from "react";
import { fetchUsers } from "../api/usersApi";
// import { withAsync } from "../helper/with-async";
import { useApi } from "../api/hooks/useApi";

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

type User = {
  id: number;
  email: string;
  name: string;
};

const useFetchUsers = () => {
  const {
    data: users,
    status: apiStatus,
    exec: initFetchUsers,
  } = useApi<User>(() => fetchUsers().then((response) => response.data));
  return {
    users,
    apiStatus,
    initFetchUsers,
  };
};
