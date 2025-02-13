### includeUpdatableResource 함수 추상화

```jsx
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
```

- 함수형 프로그래밍 책에서 나온것처럼 함수 이름에 특정 데이터를 칭하는 용어가 들어갈 경우 일반화 가능
- 예를 들면, User를 삭제하고 인수로 전달받도록 하면 좀더 일반적인 함수가 된다.
