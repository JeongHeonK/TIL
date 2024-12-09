### Ref

```js
const idInput = document.getElementById("username-input");
idInput.focus();
```

이걸 React에서는 Ref로 처리함.

- 렌더링을 유발하지 않고 어딘가에 값을 저장할때 (timerId)
- 직접 돔에 접근할 때 사용.
- 그러나 ref를 통해서 리액트가 관리하는 돔을 직접 변경할 경우 충돌을 일으킬 수 있음

```jsx
const Test = () => {
  const [show, setShow] = useState(true
  const ref = useRef(null);

  const handleWithState = () => setShow(!show);
  const handleWithRef = () => ref.current.remove();

  return (
    <div>
      <button onClick={handleWithState}>state</button>
      <button onClick={handleWithRef}>ref</button>
      {show && <p>some word</p>}
    </div>
  );
};
```

- ref 버튼을 눌러서 직접 삭제하면 그 뒤로 다시 state 버튼을 누르면 에러가 발생한다.

```jsx
const Form = () => {
  const [inputValue, setInputValue] = useState("");

  const submit = () => {
    console.log(inputValue);
  };

  const handleChangeWithState = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <input type="text" onChange={handleChangeWithState} />
      <button onClick={submit}>submit</button>
    </>
  );
};
```

```jsx
const Form = () => {
  const ref = useRef("");

  const submit = () => {
    console.log(ref.current);
  };

  const handleChangeWithRef = (e: ChangeEvent<HTMLInputElement>) => {
    ret.current = e.target.value;
  };

  return (
    <>
      <input type="text" onChange={handleChangeWithRef} />
      <button onClick={submit}>submit</button>
    </>
  );
};
```

이렇게 보면 2개 별 차이 없음.

#### ref는 리렌더링을 유발하지 않는다.

```jsx
const Form = () => {
  const ref = useRef("");
  const charCount = ref.current.length || 0;

  const submit = () => {
    console.log(ref.current);
  };

  const handleChangeWithRef = (e: ChangeEvent<HTMLInputElement>) => {
    ret.current = e.target.value;
  };

  return (
    <div>
      <input type="text" onChange={handleChangeWithRef} />
      <button onClick={submit}>submit</button>
      <h2>Number of Char: {charCount}</h2>
    </div>
  );
};
```

리렌더링을 유발하지 않으므로 업데이트 되지않고 계속 0이 표시됨

prop으로 전달되더라도 리렌더링 되지 않음 <br />
-> 당연함(객체를 전달한 것이고 참조값은 변하지 않음) <br />
-> 그럼 state는? state는 값이 변해야 하기 때문에 매번 새로운 state를 생성하는 중임

```js
const [state, setState] = useState({ a: 1 });
// 동작 안함 같은 객체 참조값
const increment = () => setState((prev) => (prev.a = prev.a + 1));
// 동작, 다른 객체 참조값
const increment = () =>
  setState((prev) => {
    return { ...prev, a: prev.a + 1 };
  });
```

#### ref는 동기적으로 state는 비동기적으로 업데이트 됨다.

- state를 업데이트하면 work를 scheduler에게 전달함.
- 그 이후 Reconciler가 diffing 알고리즘과 함께 비교하며 내용을 업데이트함
- 이후 commit phase까지 모두 거친다음 repaint가 수행됨.

```js
const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  console.log("before" + input);
  setInput(e.target.value);
  console.log("after" + input);
};
```

이렇게 수행할 경우 handleChange가 실행된 시점에서 setInput이 비동기적으로 동작하기에 input은 업데이트 되지않음 값을 둘다 return함.

```js
const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  console.log("before" + ref.current);
  ref.current = e.target.value;
  console.log("after" + ref.current);
};
```

이 경우 위 console.log와 아래의 console.log는 다른 값을 나타냄
