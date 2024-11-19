import { useEffect, useState } from "react";
import { Props as User } from "./Server/user-info";

type GetData = <T>() => Promise<T>;

type Props = {
  getData: GetData;
  render: (resource: User["user"]) => JSX.Element;
};

export const DataSourceWithRender = ({ getData, render }: Props) => {
  const [resource, setResource] = useState<User["user"]>();

  useEffect(() => {
    (async () => {
      const data = await getData<User["user"]>();

      setResource(data);
    })();
  }, [getData]);

  if (resource) {
    return render(resource);
  }

  return null;
};
