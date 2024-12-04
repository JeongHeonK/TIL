### memo

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

memoization

```jsx
// Anti-pattern
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
