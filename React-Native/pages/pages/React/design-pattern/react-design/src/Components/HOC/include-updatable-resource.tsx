import axios from "axios";
import { ComponentType, useEffect, useState } from "react";

const toCapital = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const includeUpdatableResource = (
  Component: ComponentType<any>,
  resourceUrl: string,
  resourceName: string
) => {
  return (props: any) => {
    const [initialResource, setInitialResource] = useState<object>();
    const [resource, setResource] = useState<object>();

    useEffect(() => {
      (async () => {
        const response = await axios.get(resourceUrl);
        setInitialResource(response?.data);
        setResource(response?.data);
      })();
    }, []);

    const onChange = (updates: object) => {
      setResource({ ...resource, ...updates });
    };

    const onPost = async () => {
      const response = await axios.post(resourceUrl, {
        [resourceName]: resource,
      });
      setInitialResource(response.data);
      setResource(response.data);
    };

    const onReset = () => {
      setResource(initialResource);
    };

    const resourceProps = {
      [resourceName]: resource,
      [`onChange${toCapital(resourceName)}`]: onChange,
      [`onPost${toCapital(resourceName)}`]: onPost,
      [`onReset${toCapital(resourceName)}`]: onReset,
    };

    return <Component {...props} {...resourceProps} />;
  };
};
