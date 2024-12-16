### useDeferredValue

useDeferredValue는 UI 일부 업데이트를 지연시킬 수 있는 React Hook

반환값: 초기 렌더링 중에는 반환된 ‘지연된 값’은 사용자가 제공한 값과 같다. 업데이트가 발생하면 React는 먼저 이전 값으로 리렌더링을 시도(반환값이 이전 값과 일치하도록)하고, 그다음 백그라운드에서 다시 새 값으로 리렌더링을 시도(반환값이 업데이트된 새 값과 일치하도록)한다.

즉

```js
const [state, setState] = useState("12");
const deferredValue = useDeferredValue(state);
```

이 경우 처음 렌더링 시 state값은 초기값과 일치하지만, setState로 state가 업데이트 될 시, deferredValue에서는 일단 초기값을 유지하고 천천히 업데이트 한다.

그래서 무거운 컴포넌트와 같이 쓸 때, 그리고 컴포넌트에게 prop까지 전달할 경우 deferredValue를 사용한다.

```jsx
const MemoedHeavyComp = memo(HeavyComp);

const App = () => {
  const [state, setState] = useState("12");
  const deferredValue = useDeferredValue(state);

  return (
    <Fragment>
      <input value={state} onChange={(e) => setState(e.target.value)} />
      <MemoedHeavyCom input={state} />
    </Fragment>
  );
};
```
