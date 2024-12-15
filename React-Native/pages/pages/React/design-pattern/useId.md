### useId

- 같은 컴포넌트를 불러왔을 때, 생기는 동작 버그

```jsx
const Form = () => {
  const [emailInput, setEmailInput] = useState("");

  const handleInput = (e) => {
    const { value } = e.target;
    setEmailInput(value);
  };

  return (
    <div>
      <label>
        <input
          id="email"
          type="email"
          value={emailInput}
          onChange={handleInput}
        />
      </label>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <Form />
      <p>....some text</p>
      <Form />
    </div>
  );
};
```

위 예시처럼 같은 컴포넌트를 불러왔을 때 컴포넌트 내부의 동작은 분리된 모듈안에서 각자 동작하나, App 컴포넌트에서 첫번째 Form과 두번째 Form 구분을 못함.

- `Math.random()`을 사용하면, 서버에서 생성된 값과 클라이언트에서 생성된 id값이 달라지게 됨.

---

#### useId() 사용

```jsx
const Form = () => {
  const [emailInput, setEmailInput] = useState("");
  const id = useId();

  const handleInput = (e) => {
    const { value } = e.target;
    setEmailInput(value);
  };

  return (
    <div>
      <label htmlFor={id}>
        <input id={id} type="email" value={emailInput} onChange={handleInput} />
      </label>
    </div>
  );
};
```

**_주의_**

- useId를 하나의 컴포넌트에서 여러번 사용해야할 경우

```jsx
//이렇게 하면 안됨
const id = useId();
const id2 = useId();
```

뒤에 string을 붙여서 구분한다.

```jsx
const Form = () => {
  const [emailInput, setEmailInput] = useState("");
  const id = useId();

  const handleInput = (e) => {
    const { value } = e.target;
    setEmailInput(value);
  };

  return (
    <div>
      <label htmlFor={`${id}-email`}>
        <input
          id={`${id}-email`}
          type="email"
          value={emailInput}
          onChange={handleInput}
        />
      </label>
      <label htmlFor={`${id}-name`}>
        <input id={`${id}-name`} type="text" />
      </label>
    </div>
  );
};
```

---

#### 갑자기 생각난 bind의 문제점.

- 인수 전달로 인해 새로운 handler함수 생성하기 싫을 때, 개인 프로젝트에서만 `func.bind(null, ...args)`를 사용했다.
- 근데 이 방법은 e.target.value를 사용할 때는 사용 불가하다.
- `.bind(null, e.target.value)`를 사용했을 때, 해당 컴포넌트가 마운트 되는 시점에서 전달되는 인수가 평가되기 때문에 event부터 `undefined`로 정의된다.
- 그래서 undefined is not an object라는 에러가 발생한다.
- 그 뒤로 그냥 bind 안 쓴거 같다.

- 갑자기 기억이나서 정리해봄.
