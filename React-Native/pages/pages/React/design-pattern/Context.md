### Context

- prop drilling을 방지하면서, state를 전달할 수 있음.
- state lifting의 부작용으로 해당 스테이트가 관리되는 모든 하위 컴포넌트 리렌더링을 막을 수 있음.

```jsx
const Context = React.createContext({
  collapsed: false,
  toggle: () => {},
});

const useNav = () => useContext(Context);

const NavController = ({ children }: { children: ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => setCollapsed(!collapsed);

  return (
    <Context.Provider value={{ collapsed, toggle }}>
      {children}
    </Context.Provider>
  );
};

export default NavController;
```

이렇게 만들면 Context를 구독하는 컴포넌트만 리렌더링 발생

---

#### 문제점

context를 구독한는 컴포넌트라면 특정 값을 사용하지 않더라도 리렌더링이 발생한다.

예를 들면 위 예서에서 `toggle()`로 setter함수만 조작하는 컴포넌트도 `collapsed` 상태가 변하면 리렌더링이 발새한다.

---

### 불필요한 리렌더링 방지 (Memoization)

```jsx
const Context = React.createContext({
  collapsed: false,
  toggle: () => {},
});

const useNav = () => useContext(Context);

const NavController = ({ children }: { children: ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggle = useCallback(() => setCollapsed(!collapsed), [collapsed]);

  const value = useMemo(() => {
    return {
      collapsed,
      toggle,
    };
  }, [collapsed, toggle]);
  // Memoization

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default NavController;
```

- 이렇게 하면 toggle 값이 변하지 않았다 생각하여 리렌더링이 발생하지 않는다.
- 그러나 이렇게 하더라도 collapsed state가 바뀐다면 toggle()만 사용하는 컴포넌트들도 모두 리렌더링 된다.

---

### 컨텍스트 분리

- 데이터나 상태를 관리하는 Context와 api를 관리하는 Context를 분리한다

```jsx
const ContextData = React.createContext({
  collapsed: false,
});
const ContextApi = React.createContext({
  toggle: () => {},
});

const useNavData = () => useContext(ContextData);
const useNavApi = () => useContext(ContextApi);

const NavController = ({ children }: { children: ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggle = useCallback(() => setCollapsed((prev) => !prev), []);
  // useCallback 내의 의존성도 제거해야 함.

  return (
    <ContextData.Provider value={collapsed}>
      <ContextApi.Provider value={toggle}>{children}</ContextApi.Provider>
    </ContextData.Provider>
  );
};

export default NavController;
```

---

### Context 최적화 (useReducer 패턴)

컴포넌트 분리를 통한 최적화

```tsx
type State = {
  count: number;
};

type Action = {
  type: "INCREMENT" | "DECREMENT";
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    default:
      throw new Error("Provide a valid action.");
  }
}

type CartContext = {
  state: { count: number };
  dispatch: Dispatch<Action>;
};

export const Context = createContext<CartContext | null>(null);

function App() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <Context.Provider value={{ state, dispatch }}>
      <Display />
      <Button />
    </Context.Provider>
  );
}

export function useCartContext() {
  const value = useContext(Context);

  if (value === null) {
    throw new Error("Must be inside Context.Provider");
  }

  return value;
}
```

---

#### Provider 분리

```tsx
function App() {
  return (
    <CartProvider>
      <Display />
      <Button />
    </CartProvider>
  );
}
```

```tsx
type State = {
  count: number;
};

type Action = {
  type: "INCREMENT" | "DECREMENT";
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    default:
      throw new Error("Provide a valid action.");
  }
}

type CartContext = {
  state: { count: number };
  dispatch: Dispatch<Action>;
};

export const Context = createContext<CartContext | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export function useCartContext() {
  const value = useContext(Context);

  if (value === null) {
    throw new Error("Must be inside Context.Provider");
  }

  return value;
}
```

context관련 코드와 rendering 코드 분리 가능

그러나 이경우 context가 하나로 통합되어 dispatch만 사용하더라도 렌더링 발생

> **참고**: `useReducer`의 `dispatch`는 React가 안정적인 참조를 보장하므로, dispatch Context를 분리하면 별도의 memoization 없이도 안전하게 사용할 수 있다.

---

#### State/Dispatch Context 분리

```tsx
type State = {
  count: number;
};

type Action = {
  type: "INCREMENT" | "DECREMENT";
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    default:
      throw new Error("Provide a valid action.");
  }
}

type CartStateContext = {
  state: { count: number };
};

type CartDispatchContext = {
  dispatch: Dispatch<Action>;
};

export const StateContext = createContext<CartStateContext | null>(null);
export const DispatchContext = createContext<CartDispatchContext | null>(null);
// context를 분리해서 구독을 나눠줌

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

export function useStateContext() {
  const value = useContext(StateContext);

  if (value === null) {
    throw new Error("Must be inside Context.Provider");
  }

  return value;
}

export function useDispatchContext() {
  const value = useContext(DispatchContext);

  if (value === null) {
    throw new Error("Must be inside Context.Provider");
  }

  return value;
}
```

---

### Context 사용 시 파생 상태 구독

- Context의 연속적인 값(숫자, 문자열 등)을 구독하면, 값이 바뀔 때마다 리렌더링이 발생한다.
- 컴포넌트가 실제로 필요한 것이 파생된 boolean 값이라면, 해당 boolean만 구독하도록 분리한다.

```tsx
// Anti-pattern: width가 바뀔 때마다 리렌더링
function Sidebar() {
  const { width } = useAppContext();
  const isMobile = width < 768;
  return <nav className={isMobile ? "mobile" : "desktop"} />;
}

// 올바른 패턴: boolean 전환 시에만 리렌더링
function Sidebar() {
  const isMobile = useMediaQuery("(max-width: 767px)");
  return <nav className={isMobile ? "mobile" : "desktop"} />;
}
```

---

### Next.js에서 Context 사용 시 주의점

- Server Component에서는 Context를 사용할 수 없다. Provider는 반드시 Client Component로 분리해야 한다.
- RSC 경계에서 Context value로 전달되는 데이터는 직렬화되므로, 클라이언트에서 실제 사용하는 필드만 전달하는 것이 성능상 유리하다.
