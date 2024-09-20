## 리렌더링 최적화

- 전역 상태는 여러 속성이 있으며 중첩된 객체일 수 있다.

```jsx
const state = {
  a: 1,
  b: { c: 2, d: 3 },
  e: { f: 4, g: 5 },
};
```

```jsx
const Component1 = () => {
  const stateBC = state.getState().b.c;
  return <div>{state}</div>;
};

const Component2 = () => {
  const stateEG = state.getState().e.g;
  return <div>{state}</div>;
};
```

이 경우 `state.a++`가 실행되어도 Component1과 Component2는 다시 렌더링 될 필요가 없다.

---

## 컴포넌트에서 전역 상태의 어느 부분이 사용될 지 지정하는 것

방법

- 선택자 함수 사용
- 속성 접근 감지
- 아톰 사용

---

### 1. 선택자 함수 사용

```jsx
const Component = () => {
  const value = useSelector((state) => state.b.c);

  return <div>{value}</div>;
};
```

- useSelector(선택자 함수)는 state가 변경될 때마다 선택자 함수의 결과를 비교하는 데 사용된다.

```jsx
const Component = () => {
  const value = useSelector((state) => state.b.c * 2);

  return <div>{value}</div>;
};
```

- 선택자 함수는 유연하기에 파생된 값도 반환가능한다.
- 컴포넌트의 어느 부분을 사용할 지 명시적으로 지정하기에 "수동 최적화"라고 부름.

### 2. 속성 접근 감지

- 속성 접근을 감지하고 감지한 정보를 렌더링 최적화에 사용한다.

```jsx
const Component = () => {
  const trackedValue = useTrackedState();

  return <div>{trackedValue.b.c}</div>;
};
```

- `state.b.c` 속성 값이 바뀔때 리렌더링 발생
- 자동 렌더링 최적화 -> useSelector처럼 어느 속성인지 명시하지 않음.

### 3. 아톰 사용

- 리랜더링을 발생시키는 데 사용되는 최소 상태 단위

```jsx
const globalState = {
  a: atom(1),
  b: atom(2),
  c: atom(3),
};

const Component = () => {
  const value = useAtom(globalState.a);
  return <>{value}</>;
};
```

- 아톰이 분리돼 있다면 별도의 전역 상태를 갖는 것과 거의 같다.
