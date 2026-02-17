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

---

### 콜백에서만 사용하는 상태 구독 제거

- 렌더링에는 사용하지 않고 이벤트 핸들러에서만 읽는 값이라면, 구독(useSearchParams, useContext 등)할 필요 없이 사용 시점에 직접 읽는 것이 좋다.
- 불필요한 구독은 관련 없는 변경에도 리렌더링을 유발한다.

```jsx
// Anti-pattern: searchParams 구독 → 쿼리 변경마다 리렌더링
function ShareButton({ chatId }) {
  const searchParams = useSearchParams();

  const handleShare = () => {
    const ref = searchParams.get("ref");
    shareChat(chatId, { ref });
  };

  return <button onClick={handleShare}>Share</button>;
}

// 올바른 패턴: 사용 시점에 직접 읽기 → 구독 없음
function ShareButton({ chatId }) {
  const handleShare = () => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    shareChat(chatId, { ref });
  };

  return <button onClick={handleShare}>Share</button>;
}
```

이 원칙은 State Collocation과 같은 맥락이다. 상태는 실제로 필요한 곳에서, 필요한 시점에 접근하는 것이 최적이다.
