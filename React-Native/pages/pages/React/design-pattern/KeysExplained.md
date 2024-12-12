### Keys Explained

```jsx
function App() {
  const [productSwitch, setProductSwitch] = useState(false);

  return (
    <div>
      {productSwitch ? (
        <>
          <span>Shirts Cont</span> <Counter />
        </>
      ) : (
        <>
          <span>Shoes Cont</span> <Counter />
        </>
      )}
      <button onClick={() => setProductSwitch(!productSwitch)}>Switch</button>
    </div>
  );
}
```

예전에도 적었지만, jsx는 createElement()를 통해서 객체를 생성한다.<br />
이 경우, `{type: Fragment, Children: {type: span}, {type: Counter}}` 이런 형식으로 같기 때문에 새로 mount하는 것이 아니라<br />
기존 리액트 컴포넌트에 속성만 바꿔서 사용한다. 즉 counter 변경값이 그대로 보존된다.
<br/>
<br/>
이 경우, key를 추가하면 된다.

---

리액트의 레거시 코드인 `Fragment`를 사용하면 key를 추가할 수 있다.<br/>
그러나 fragment 전체를 다시 마운트하는 것이 나을지, `Counter`컴포넌트를 다시 마운트 하는 것이 나은지 묻는다면<br/>
당연히 후자이므로 `Counter`에 키를 추가해야 한다.
