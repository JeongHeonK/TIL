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
