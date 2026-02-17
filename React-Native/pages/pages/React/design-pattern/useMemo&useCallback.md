### useMemo & useCallback

```jsx
const Comp = () => {
  const submit = useCallback(() => {}, []);

  useEffect(() => {
    submit();
  // useCallback으로 감싼 경우 useCallback에 할당한 dependency값이
  // 달라지지 않는한 같은 값으로 판단.
  // useEffect 실행 방지
  }, [submit]);

  return ();
};
```

다만, 필요없는 상황에서 굳이 쓸 필요 없음

```jsx
const Comp = () => {
  const handleClick = useCallback(() => {}, []);

  return <button onClick={handleClick}>click</button>;
};
```

클릭을 통해 re-rendering이 유발되면 useCallback 내의 함수의 재생성만 막을 뿐,
Jsx의 렌더링에는 관여하는 바가 없음.

오히려 익명함수로 전환되면서 디버깅하기 더 어려워짐.

---

### useCallback hook to preserve referential integrity

- 동적 렌더링으로 렌더링한 컴포넌트와 Input이 같이 있을 때 고려할 점임.

```jsx
const App = () => {
  const [input, setInput] = React.useState("");
  const [lists, setLists] = React.useState(initialData);

  const deleteList = (id) => {
    setLists((prevLists) => prevLists.filter((list) => list.id !== id));
  };

  const addList = (newList) => {
    setLists((prevLists) => [...prevLists, newList]);
  };

  return (
    <div>
      <InputLists lists={lists} onDelete={deleteList} />
      <Input value={input} onChange={setInput} addList={addList} />
    </div>
  );
};
```

위의 경우 사용자가 입력값을 입력할 때마나 `<InputLists>` 컴포넌트도 리랜더링됨.

```jsx
const InputLists = memo(InputLists);

const App = () => {
  const [input, setInput] = React.useState("");
  const [lists, setLists] = React.useState(initialData);

  const deleteList = (id) => {
    setLists((prevLists) => prevLists.filter((list) => list.id !== id));
  };

  const addList = (newList) => {
    setLists((prevLists) => [...prevLists, newList]);
  };

  return (
    <div>
      <InputLists lists={lists} onDelete={deleteList} />
      <Input value={input} onChange={setInput} addList={addList} />
    </div>
  );
};
```

- 그래서 이렇게 memo를 하더라도 deleteList는 결국 일급함수 -> 참조값이기 때문에 App이 mount되면서 새로운 값이 됨.
- 즉 prop이 계속 바뀐다고 판단함.
- 그러니 `deleteList`도 useCallback으로 감싸야 함.

```js
const deleteList = useCallback((id) => {
  setLists((prevLists) => prevLists.filter((list) => list.id !== id));
}, []);
```

- 저번 팀 프로젝트 제어 컴포넌트랑 같이 렌더링되는 컴포넌트 맡은 양반들 다 이거 안 씀.
- 나도 발견 못 하고 생각도 못 함.
- 망함.
- 내가 맡은 부분에서는 어떻게는 server component로 유지하려고 했기에 아마 컴포넌트 자체가 분리되어서 얻어걸림.
- 아 씁쓸하다.

---

### useCallback과 useMemo의 차이

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

---

### 단순한 원시값 표현식에 useMemo를 쓰지 말 것

- 표현식이 단순하고 결과가 원시값(boolean, number, string)이면 useMemo를 쓰는 것이 오히려 비효율적이다.
- useMemo 호출과 의존성 비교 자체가 표현식보다 더 비용이 들 수 있다.

```tsx
// Anti-pattern: 불필요한 useMemo
function Header({ user, notifications }) {
  const isLoading = useMemo(() => {
    return user.isLoading || notifications.isLoading;
  }, [user.isLoading, notifications.isLoading]);

  if (isLoading) return <Skeleton />;
}

// 올바른 패턴: 직접 계산
function Header({ user, notifications }) {
  const isLoading = user.isLoading || notifications.isLoading;

  if (isLoading) return <Skeleton />;
}
```

---

### functional setState로 안정적인 콜백 만들기

- 현재 state 값에 기반해 업데이트할 때는 반드시 함수형 업데이트를 사용한다.
- stale closure 방지 + useCallback의 의존성 배열을 비울 수 있다.

```tsx
// Anti-pattern: items 의존성 필요 → 매번 콜백 재생성
const addItem = useCallback((newItem) => {
  setItems([...items, newItem]);
}, [items]);

// 올바른 패턴: 의존성 없이 안정적인 콜백
const addItem = useCallback((newItem) => {
  setItems((prev) => [...prev, newItem]);
}, []);
```

---

### React Compiler 참고

- React Compiler가 활성화된 프로젝트에서는 `useMemo()`, `useCallback()`을 수동으로 작성할 필요가 없다.
- 컴파일러가 자동으로 최적화를 수행한다.
