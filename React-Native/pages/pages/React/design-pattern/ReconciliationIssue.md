### Reconciliation Issue

```jsx
const OTP = () => {
  const [received, setReceived] = useState(false);

  return (
    <CheckboxWrapper>
      <Checkbox id="otp-checkbox" onChange={() => setReceived(!received)}>
      <label htmlFor="otp-checkbox">I received the OTP</label>
    </CheckboxWrapper>

    {received ? (
      <Input id="otp-code" placeholder="Enter the otp code here" />
      ) : (
        <p>hit the checkbox</p>
      )}
  )
}
```

이 경우 input 태그에 글자를 입력하고 체크박스를 클릭하여 리렌더링을 발생시킬 경우, 텍스트 내용이 초기화됨.

```jsx
const OTP = () => {
  const [received, setReceived] = useState(false);

  return (
    <CheckboxWrapper>
      <Checkbox id="otp-checkbox" onChange={() => setReceived(!received)}>
      <label htmlFor="otp-checkbox">I received the OTP</label>
    </CheckboxWrapper>

    {received ? (
      <Input id="otp-code" placeholder="Enter the otp code here" />
      ) : (
      <Input id="email" placeholder="Enter the e-mail" />
      )}
  )
}
```

그러나 같은 태그를 사용할 경우, 스테이트를 변경해서 리렌더링을 유발하더라도 사용자 입력값이 유지됨.

이 상황에서는 unmount가 발생하지 않음

왜냐면 리액트에서는 같은 값으로 컴포넌트로 판단하고 첫번째로 렌더링 된 값에서 속성만 바꿈.
