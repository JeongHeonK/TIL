### Less useEffect

```jsx
function ProductPage({ product, addToCart }) {
  useEffect(() => {
    showNotification(`Added ${product.name} to the shopping cart!`);
  }, [product]);

  function handleBuyClick() {
    addToCart(product);
  }

  function handleCheckoutClick() {
    addToCart(product);
    navigateTo("/checkout");
  }
}
```

useEffect가 두번 실행됨.

1. product 변경시 한번
2. product Prop이 바뀌어 리랜더링 되면서 한번

---

#### Solution

생각해보면 굳이 useEffect를 사용할 필요가 없음.

```jsx
function ProductPage({ product, addToCart }) {
  function buyProduct() {
    addToCart(product);
    showNotification(`Added ${product.name} to the shopping cart!`);
  }

  function handleBuyClick() {
    buyProduct();
  }

  function handleCheckoutClick() {
    buyProduct();
    navigateTo("/checkout");
  }
}
```

---

### 파생 상태는 렌더링 중에 계산

- props/state에서 계산할 수 있는 값을 별도 state + useEffect로 관리하면 불필요한 렌더링과 상태 불일치가 발생한다.
- 렌더링 중에 직접 계산하면 추가 렌더링 없이 항상 최신 값이 보장된다.

```jsx
// Anti-pattern: 불필요한 state + useEffect
function Form() {
  const [firstName, setFirstName] = useState("First");
  const [lastName, setLastName] = useState("Last");
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    setFullName(firstName + " " + lastName);
  }, [firstName, lastName]);

  return <p>{fullName}</p>;
}

// 올바른 패턴: 렌더링 중 직접 계산
function Form() {
  const [firstName, setFirstName] = useState("First");
  const [lastName, setLastName] = useState("Last");
  const fullName = firstName + " " + lastName;

  return <p>{fullName}</p>;
}
```

---

### useEffect 대신 이벤트 핸들러를 사용해야 하는 상황 정리

사이드 이펙트가 특정 사용자 행동(클릭, 제출 등)에 의해 발생하는 것이라면, state + effect 조합이 아니라 해당 이벤트 핸들러에서 직접 실행해야 한다.

```jsx
// Anti-pattern: 이벤트를 state + effect로 모델링
function Form() {
  const [submitted, setSubmitted] = useState(false);
  const theme = useContext(ThemeContext);

  useEffect(() => {
    if (submitted) {
      post("/api/register");
      showToast("Registered", theme);
    }
  }, [submitted, theme]); // theme 변경 시에도 재실행됨!

  return <button onClick={() => setSubmitted(true)}>Submit</button>;
}

// 올바른 패턴: 이벤트 핸들러에서 직접 실행
function Form() {
  const theme = useContext(ThemeContext);

  function handleSubmit() {
    post("/api/register");
    showToast("Registered", theme);
  }

  return <button onClick={handleSubmit}>Submit</button>;
}
```
