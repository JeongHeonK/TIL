### Ref for accessing Dom

- dom에 접근할 때는 렌더링이 완료된 후 Ref값을 참조할 수 있다.
- 그러므로 보통 useEffect내에서 참조하거나, Event handler내에서 참조한다.

```jsx
const Form = () => {
  const [inputValue, setInputValue] = useState("");
  const ref = useRef < HTMLInputElement > null;

  const submit = () => {
    if (inputValue.length < 1) {
      ref.current?.focus();
      return;
    }

    sendData();
  };

  const handleChangeWithState = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <input type="text" ref={ref} onChange={handleChangeWithState} />
      <button onClick={submit}>submit</button>
    </>
  );
};
```

- 리액트 공식문서에서는 Ref가 탈출구이며, 충돌이니 사용에 주의를 요한다고 적혀있어서 useRef()사용을 기피했다.
- 다시 읽어보니 돔 삭제같은 조작말고 스크롤 이벤트나 이러한 focus 이벤트는 사용하라고 되어 있다.
- 거기다 직접 돔을 조작하는 경우가 아니면 괜찮다고 한다.
- 이래서 얕게 공부하면 망하는 것 같다.
