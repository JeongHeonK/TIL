## memo는 context의 재렌더링을 막지 못한다.

```jsx
const ColorComponent = () => {
  const color = useContext(ColorContext);
  const renderCount = useRef(1);

  useEffect(() => {
    renderCount.current += 1;
  });

  return (
    <div style={{ color }}>
      Hello {color} (renders: {renderCount.current})
    </div>
  );
};

const MemoedColorComponent = memo(ColorComponent);
```

- memo로 한번 감싸더라도 렌더링을 막지 못함

<img width="200" alt="before-test" src="https://github.com/user-attachments/assets/51d9fb36-ce40-4de6-8be9-39b61701cc06">
<br />
<img width="200" alt="after-test" src="https://github.com/user-attachments/assets/ac047257-451e-415e-a21a-f6c03bf3df2f">

<br />

- 컴포넌트가 일관된 컨텍스트 값을 가져야 하기에 memo로 갑싸더라도 재렌더링 발생

---

### 렌더링 카운트 2 증가 이유

- strick mode
