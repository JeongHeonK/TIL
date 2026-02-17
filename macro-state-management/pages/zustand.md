## zustand

- 상태를 유지하는 store를 만드는 데 사용되는 라이브러리.
- 불변 상태 모델을 기반으로 한다.

```jsx
import { create } from "zustand";

export const useStore = create(() => ({
  count: 0,
  text: "hello",
}));
```

```jsx
import { useStore } from "./store.ts";

const Component = () => {
  const { count, text } = useStore();
  return <div>count: {count}</div>;
};
```

- 이렇게 사용할 경우 text 값이 변경되더라도 리렌더링이 발생할 수 있음.
- 선택자 함수를 사용해 재작성 한다.

```jsx
import { useStore } from "./store.ts";

const Component = () => {
  const count = useStore((state) => state.count);
  return <div>count: {count}</div>;
};
```

- 결과값을 비교해서 렌더링 실행 여부를 판단하기 때문에 레퍼런스 값을 리턴하도록 지겅할 경우 주의해야 한다.

```jsx
import { useStore } from "./store.ts";

const Component = () => {
  const [{ count }] = useStore((state) => [{ count: state.count }]);
  return <div>count: {count}</div>;
};
```

---

## Code Refactoring

```jsx
const selectCount1 = (state: StoreState) => state.count1;

const Counter1 = () => {
  const count1 = useStore(selectCount1);
  const inc1 = () => {
    useStore.setState((prev) => ({ count1: prev.count1 + 1 }));
  };

  return (
    <div>
      count1: {count1} <button onClick={inc1}>+1</button>
    </div>
  );
};
```

```tsx
type StoreState = {
  count1: number;
  count2: number;
  inc1: () => void;
  inc2: () => void;
};

const useStore = create<StoreState>((set) => ({
  count1: 0,
  count2: 0,
  inc1: () => set((prev) => ({ count1: prev.count1 + 1 })),
  inc2: () => set((prev) => ({ count2: prev.count2 + 1 })),
}));
```

```jsx
const selectCount2 = (state: StoreState) => state.count2;
const selectInc2 = (state: StoreState) => state.inc2;

const Counter1 = () => {
  const count2 = useStore(selectCount2);
  const inc2 = useStore(selectInc2);

  return (
    <div>
      count2: {count2} <button onClick={inc2}>+1</button>
    </div>
  );
};
```

---

### 파생된 값에 대한 선택자 함수 사용

```jsx
const selectCount1 = (state: StoreState) => state.count1;
const selectCount2 = (state: StoreState) => state.count2;

const Counter1 = () => {
  const count1 = useStore(selectCount1);
  const count2 = useStore(selectCount2);

  return <div>total: {count1 + count2}</div>;
};
```

- 위 경우 count1이 +1 증가하고 count2가 -1 감소했을 경우 결과 값은 같으나 재랜더링이 발생한다.
- 이를 위해 파생된 값에 대한 selector 함수를 시행한다.

```jsx
const selectTotal = (state: StoreState) => state.count1 + state.count2;

const Counter1 = () => {
  const total = useStore(selectTotal);

  return <div>total: {total}</div>;
};
```

선택자 함수는 결과를 비교하기에 재렌더링이 방지된다.
