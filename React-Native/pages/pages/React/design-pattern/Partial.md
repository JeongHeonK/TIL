### Partial

```jsx
import { Buttons } from "./Compositions";

export default function partialComponent(Component: any, partialProps: any) {
  return (props: any) => {
    return <Component {...props} {...partialProps} />;
  };
}

export const RedButton = partialComponent(Buttons, { color: "red" });
export const SmallRedButton = partialComponent(RedButton, { size: "small" });
```

- 이렇게 컴포넌트를 return 하는 방식은 타입스크립트와 같이 쓰기에 너무 난이도가 높다.
- 굳이 이렇게 써야하는지 의문이 든다
