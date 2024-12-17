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
