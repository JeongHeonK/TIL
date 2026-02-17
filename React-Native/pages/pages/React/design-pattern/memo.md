### Memoization

- React에서 memoization을 통해 해결하려는 문제점
- `useMemo()`와 `useCallback()`의 내부 원리와 차이점.
- 왜 props를 memoization 하는 것은 나쁜 방법인가?
- memo의 사용법과 필요성, 그리고 효율적인 사용방법
- children에 대한 올바른 접근 방법

---

### memo 기본 사용법

- 부모 컴포넌트가 리랜더링될 시, 전달되는 prop이 일치한다면 리렌더링하지 않는다.

```jsx
import { memo } from "react";

const SomeComp = memo(function SomeComp(prop) {});
```

- context api 사용할 때 rerendering 발생
- 부모로부터 전달되는 prop이 레퍼런스 값(배열, 객체)일 때 리랜더링 됨.
- prop이 레퍼런스 값일 경우 useMemo를 사용해서 prop도 캐시에 저장해줘야 함.

---

### memo 상세

- 부모컴포넌트가 리랜더링되면 포함된 자식요소도 모두 리렌더링된다.
- 그러나 Memo를 사용할 경우 컴포넌트 그 자체를 memoization 하고, 전달된는 prop의 값이 같다면 리랜더링 하지 않는다.
- 하지만 전달되는 Prop이 참조값일 경우 Prop이 변경된 것으로 인식해서 리렌더링된다.

```jsx
// Anti-pattern
const MyComp = ({ info, changeHandler }) => {};
const MemoizedMyComp = React.memo(MyComp);

const Parent = () => {
  const data = [];
  const changeHandler = () => {};

  return <MemoizedMyComp info={data} onChange={changeHandler} />;
};
```

memoization을 적용한 올바른 패턴

```jsx
const MyComp = ({ info, changeHandler }) => {};
const MemoizedMyComp = React.memo(MyComp);

const Parent = () => {
  const data = useMemo(() => []);
  const changeHandler = useCallback(() => {}, []);

  return <MemoizedMyComp info={data} onChange={changeHandler} />;
};
```

### Memo로 전달된 children은 왜 rerender 되는가

```jsx
const MemoizedChildComponent = React.memo(Child);

const MemoizedParentComponent = React.memo(Parent);

const MainComp = () => {
  return (
    <MemoizedParentComponent>
      <MemoizedChildComponent />
    </MemoizedParentComponent>
  );
};
```

- 사실 컴포넌트는 createElement로 생성된 객체이다.
- 그러므로 MemoizedParentComponent의 prop.children에 객체가 할당되서 전달되는 것과 같다.
- 객체는 참조값을 가지기 때문에 항상 다른 prop가 전달되었다고 판단해 memo가 동작하지 않게 된다.
- 그러므로 `useMemo()`를 사용해야 한다.

```jsx
const MemoizedChildComponent = React.memo(Child);

const MemoizedParentComponent = React.memo(Parent);

const MainComp = () => {
  const childComponent = useMemo(() => <MemoizedChildComponent />, []);

  return <MemoizedParentComponent>{childComponent}</MemoizedParentComponent>;
};
```

### memo로 감싼 컴포넌트를 사용할 때, 디스트럭쳐링으로 전달하면 안되는 이유

```jsx
const InnerComp = () => {};
const MemoizedInnerComp = React.memo(InnerComp);

const IntermediateComp = (props) => {
  return <MemoizedInnerComp {...props} />;
};

const WrapperComp = (props) => {
  return <IntermediateComp {...props} />;
};

const MainComp = (props) => {
  return <WrapperComp {...props} data={{ id: "1" }} />;
};
```

- props drilling이 발생하는 상황에서 전달되는 prop에 참조값이 없다는 것을 보장할 수 없다.
- 위 경우 memoization이 깨지게 된다.
- 항상 전달되는 Prop을 명확히 한다.

### custom hook 사용도 주의

```jsx
const Comp = () => {
  const { submit } = useSubmit();

  return <MemoizedComp onSubmit={submit} />;
};
```

위 경우에도 submit함수는 일급객체이며, useCallback으로 memoization이 되었다는 보장이 없으므로 사용 시, 꼭 확인해야 한다.

---

- memo를 안 사용하는 것이 최적이 아닐까 싶을 정도로 깨지는 상황이 많다.
- 공통점은 prop이 객체로 전달된다는 점이다.
- 생각도 못한 취약점이다. 특히 children의 경우 react의 element와 fiber node개념까지 알아야 하는 내용이라 사용시 정말 주의 해야겠다.

---

### memo 컴포넌트의 default prop 주의

- memo로 감싼 컴포넌트에 optional prop의 기본값이 비원시값(함수, 배열, 객체)일 경우, 매 렌더링마다 새로운 참조가 생성되어 memoization이 깨진다.
- 기본값을 컴포넌트 외부 상수로 추출해야 한다.

```jsx
// Anti-pattern: 매 렌더링마다 새로운 함수 참조 생성
const UserAvatar = memo(function UserAvatar({ onClick = () => {} }) {
  // ...
});

// 올바른 패턴: 안정적인 기본값
const NOOP = () => {};

const UserAvatar = memo(function UserAvatar({ onClick = NOOP }) {
  // ...
});
```

---

### memo 대신 컴포넌트 추출로 최적화

- useMemo로 JSX를 감싸는 대신, 비용이 큰 작업을 memo 컴포넌트로 분리하면 early return이 가능해진다.

```jsx
// Anti-pattern: loading 중에도 computeAvatarId 실행
function Profile({ user, loading }) {
  const avatar = useMemo(() => {
    const id = computeAvatarId(user);
    return <Avatar id={id} />;
  }, [user]);

  if (loading) return <Skeleton />;
  return <div>{avatar}</div>;
}

// 올바른 패턴: loading이면 연산 자체를 건너뜀
const UserAvatar = memo(function UserAvatar({ user }) {
  const id = useMemo(() => computeAvatarId(user), [user]);
  return <Avatar id={id} />;
});

function Profile({ user, loading }) {
  if (loading) return <Skeleton />;
  return (
    <div>
      <UserAvatar user={user} />
    </div>
  );
}
```

---

### React Compiler 참고

- React Compiler가 활성화된 프로젝트에서는 `memo()`, `useMemo()`, `useCallback()`을 수동으로 작성할 필요가 없다.
- 컴파일러가 자동으로 리렌더링을 최적화해준다.
