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
