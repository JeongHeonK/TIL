## memo

- 부모 컴포넌트가 리랜더링될 시, 전달되는 prop이 일치한다면 리렌더링됮 않는다.

```jsx
import { memo } from "react";

const SomeComp = memo(function SomComp(prop) {});
```

- context api 사용할 때 rerendering 발생
- 부모로부터 전달되는 prop이 레퍼런스 값(배열, 객체)일 때 리랜더링 됨.
- prop이 레퍼런스 값일 경우 useMemo를 사용해서 prop도 캐시에 저장해줘야 함.
