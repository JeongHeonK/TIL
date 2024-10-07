## useCallback과 useMemo의 차이

- 보통 useCallback은 함수, useMemo는 값을 기억한다고 생각한다.
- 그러나 useMemo가 함수를 return할 경우 일급 함수 특성 상 값으로 취급된다.

```js
useMemo(() => {
  return func();
});
```

- useRef, useMemo, useState들을 결국 리액트 내부 상태인 `fiber`에 붙어 있는 `hook.memoizedState`를 반환하는 과정
- `setState`, `dispatch` 역시 reconciler가 반환하는 형태

---

### 직접 구현

```tsx
import { useReducer, SetStateAction } from "react";

function useState<S>(
  initialState: S | (() => S)
): [S, (action: SetStateAction<S>) => void] {
  const [state, dispatch] = useReducer(
    (state: S, action: SetStateAction<S>): S =>
      typeof action === "function"
        ? (action as (prevState: S) => S)(state)
        : action,
    typeof initialState === "function"
      ? (initialState as () => S)()
      : initialState
  );

  return [state, dispatch];
}

import { useRef } from "react";

function useMemo<T>(factory: () => T, deps: React.DependencyList): T {
  const ref = useRef<{ value: T; deps: React.DependencyList | undefined }>({
    value: undefined as T,
    deps: undefined,
  });

  if (!ref.current.deps || !shallowEqual(deps, ref.current.deps)) {
    ref.current.value = factory();
    ref.current.deps = deps;
  }

  return ref.current.value;
}

function useCallback<T extends (...args: any[]) => any>(
  callback: T,
  deps: React.DependencyList
): T {
  return useMemo(() => callback, deps);
}

function shallowEqual(a: React.DependencyList, b: React.DependencyList) {
  return a.length === b.length && a.every((dep, i) => Object.is(dep, b[i]));
}
```
