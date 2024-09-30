## useEffect와 useLayoutEffect

### useEffect

- 사이드 이펙트를 다루기 위한 훅
- 렌더링이 완료된 후 혹은 어떤 값이 변경되었을 경우 사이드 이펙트를 수행한다.
- layout과 paint가 완료된 후에 비동기적으로 실행된다.
- 만약 DOM에 영항을 주는 코드가 있을 경우 사용자는 화면 깜빡임을 볼 수도 있음.

### useLayoutEffect

- `useEffect`와 비슷하나 실행시점이 다름.
- 렌더링 후 layout과 paint 전에 동기적으로 실행된다.

---

## 서버 컴포넌트에서의 useLayoutEffect

- `useEffect나` `useLayoutEffect` 모두 자바스크립트 코드가 다운로드 완료될때까지 실행되지 않는다
- 따라서 useLayoutEffect를 사용할 경우 서버에서 렌더링된 화면과 클라이언트에서 렌더된 화면이 다를 수 있다.

```js
import { useEffect, useLayoutEffect } from "react";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default useIsomorphicLayoutEffect;
```

- 위 훅을 사용해서 서버 컴포넌트에 대응한다.

---
