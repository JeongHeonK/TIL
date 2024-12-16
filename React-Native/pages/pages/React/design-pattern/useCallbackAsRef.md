### useCallback As Ref

```jsx
const App = () => {
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <div>
      <button onClick={() => setShowInput(!showInput)}>Switch</button>
      {showInput && <input type="text" ref={inputRef} />}
    </div>
  );
};

export default App;
```

- 당연히 에러남.
- 렌더링이 끝난후 showInput은 초기값이 false이기에 input은 아예 dom에 존재하지 않음.
- `inputRef` 는 `null`임.
- Null.current에 접근한 것임.

```jsx
const App = () => {
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    // 여기에 조건 추가
    // early-return 주로 사용.
    if (inputRef === null) return;
    inputRef.current.focus();
  });

  return (
    <div>
      <button onClick={() => setShowInput(!showInput)}>Switch</button>
      {showInput && <input type="text" ref={inputRef} />}
    </div>
  );
};

export default App;
```

그래서 inputRef가 있을때만 동작하도록 하면 됨.

---

근데 callback으로도 해결 가능

```jsx
const App = () => {
  const [showInput, setShowInput] = useState(false);
  const inputRef = useCallback((input) => {
    if (input === null) return;
    input.focus();
  }, []);

  return (
    <div>
      <button onClick={() => setShowInput(!showInput)}>Switch</button>
      {showInput && <input type="text" ref={inputRef} />}
    </div>
  );
};

export default App;
```

---

#### ???? ref에 함수전달하면 인수에 자동으로 dom 요소가 전달된다.

```jsx
const Test = () => {
  const handleRef = (elem) => {
    console.log(elem); // button node
  };

  return <button ref={handleRef}>Click</button>;
};
```
