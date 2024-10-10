## useState

복습 <br />
useReducer로 useState구현

```ts
import { useReducer } from 'react';

type SetStateAction<S> = S | ((prevState: S) => S);

const getInitialState = <T>(initialState: T | () => T): T => {
  if (typeof initialState === "function") {
    return (initialState as () => T)();
  }
  return initialState;
};

const reducer = <U>(state: U, action: SetStateAction<U>): U => {
  if (typeof action === "function") return (action as (prev: U) => U)(state);
  return action;
};

const useState = <S>(initialState: S | (() => S)): [S, (action: SetStateAction<S>) => void] => {
  const [state, dispatch] = useReducer(reducer, getInitialState(initialState));

  return [state, dispatch];
};
```

---

### useState

- reactHooks 라이브러리 <- `resolveDispatcher()` <- `ReactCurrentDispatcher.current()` <- `ReactSharedInternals`

- react 코어는 react element에 대한 정보만 알고 있음
- react element는 fiber로 확장해야 hook을 포함하게 됨.
- reconciler가 확장함

#### react 코어는 hook을 사용하기 위해 외부에서 주입받음

> 의존성을 끊기 위해서 -> mobile까지 확장가능
