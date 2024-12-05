### Diffing

```jsx
const Input ({ hint }) => {
  return <input type="text" id="unique-id" placeholder={hint} />
}

const App = () => {
  return <Input hint="hi" />
}

const App = () => {
  return <Input hint="hey" />
}
```

위 두개의 경우 기존 dom을 unmount 하고 새로운 dom을 mount하는 것이아니라 기존 dom에 직접 attr을 변경한다.

왜냐면 새로운 dom을 mount하는 것 자체가 비용이 많이 드는 작업이기 때문이다.

```jsx
const Input ({ hint }) => {
  return <input type="text" id="unique-id" placeholder={hint} />
}

// 위 컴포넌트는
// 아래 객체와 같음

{
  type: 'input',
  props: {hint},
  ...
}
```

그리고 html을 return하는 컴포넌트는 string type으로 저장된다.

그러나 컴포넌트는 함수 타입으로 저장된다.
이때 함수는 `일급 객체`이기 때문에 참조값으로 저장되며, 이 경우 객체끼리 비교하면 같은 값이라 생각한다.

```jsx
const Component = () => {
  return <Input />
}

{
  type: Input,// 이 Input 참조값은
}

{
  type: Input,// 여기오 같다. 즉 같은 값이라 생각함
}
```

```jsx
const Component = () => {
  const [state, setState] = useEffect(false);

  return (
    <>
      {state ? <Input /> : <Span />}
    </>
  )
};

{
  type: Input, // 이건 당연히, 다른값이라 생각해
}

{
  type: Span // 새롭게 마운트함
}
```

그렇다면 왜 컴포넌트 내부에서 컴포넌트를 선언하면 안되는지도 알 수 있다.

```jsx
const App = () => {
  const Input = () => <input />

  return <Input />
}

{
  type: Input,
}
```

함수 외부에서 선언될 경우, 다시 함수 생성을 하지 않기 때문에 같은 값이라 리렌더링을 유발하지 않는다.

그러나 내부에 선언하면 다시 mount됨과 동시에 내부에서 함수도 새로 선언하는 것이기 때문에 항상 다른 값을 가진다.

```js
const x = () => {};
const y = () => {};

x === y; // always false
```

그러므로 Input도 계속 새롭게 마운트 된다.

---

#### 1. 배열을 통한 해결

```jsx
const OTP = () => {
  const [received, setReceived] = useState(false);

  return (
    <>
      <CheckboxWrapper>
        <Checkbox id="otp-checkbox" onChange={() => setReceived(!received)} />
        <label htmlFor="otp-checkbox">I received the OTP</label>
      </CheckboxWrapper>

      {received ? (
        <Input id="otp-code" placeholder="Enter the otp code here" />
      ) : null}

      {received ? null : (
        <Input id="otp-code" placeholder="Enter the otp code here" />
      )}
    </>
  );
};

// 이 경우
// [CheckboxWrapper, Input, null]
// [CheckboxWrapper, null, Input]

// 이렇게 비교하기 때문에 다른 값으로 판단해서 새롭게 Input을 마운트 한다.
```

#### 2. key를 통한 초기화

리액트는 type과 key과 같을 때, 같은 컴포넌트라 판단해서 기존 돔을 재사용한다.

이걸 이용해서 key값을 바꿈으로써 다른 컴포넌트로 인식시켜 새롭게 mount 시킬 수 있다.

```jsx
const OTP = () => {
  const [received, setReceived] = useState(false);

  return (
    <>
      <CheckboxWrapper>
        <Checkbox id="otp-checkbox" onChange={() => setReceived(!received)} />
        <label htmlFor="otp-checkbox">I received the OTP</label>
      </CheckboxWrapper>
      {received ? (
        <Input id="otp-code" placeholder="Enter the otp code here" key={1} />
      ) : (
        <Input id="otp-code" placeholder="Enter the otp code here" key={2} />
      )}
    </>
  );
};
```
