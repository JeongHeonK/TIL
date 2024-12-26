### Optimizing Context

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

#### 분리

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

---

#### context 분리

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
