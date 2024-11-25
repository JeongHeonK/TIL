### Checking Props with HOCs

고차함수는 컴포넌트처럼 jsx로 사용하지 않기에 카멜케이스로 작성됨

```jsx
import { ComponentType } from "react";

export const logProps = (Component: ComponentType<any>) => {
  return (props: any) => {
    console.log(props);
    return <Component {...props} />;
  };
};
```
