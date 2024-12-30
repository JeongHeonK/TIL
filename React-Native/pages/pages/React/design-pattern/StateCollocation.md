### State Collocation

- 무조건 state lifting이 답은 아니다.
- 만약 state lifting을 했으나, 오직 한 컴포넌트에서만 쓰인다면 오히려 사용되는 곳으로 반대로 내려주는 것이 더 나을 수 있다.

```jsx
const App = () => {
  const [input, handleChange] = useInput("");

  return (
    <>
      <HeavyComp/>
      <OtherComp />
      <Input value={input} onChange={handleChange}/>
    </>
  )
};

const useInput = (initialValue: string) => {
  const [input, setInput] = useState(initialValue);

  const handleChange = (e) => {
    setInput(e.target.value)
  }

  return [input, handleChange] as const
}
```

이 경우 Input에서만 사용하는데 굳이 state lifting을 해서 다른 컴포넌트까지 rendering을 유발할 필요가 없다.

이때는 차라리 Input에서만 사용한다.
