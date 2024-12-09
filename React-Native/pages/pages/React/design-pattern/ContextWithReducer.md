### Splitting context with useReducer

```jsx
type State = { collapsed: boolean };

const defaultSate: State = { collapsed: true };

type Action = { type: "open" | "close" | "toggle" };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "open":
      return { ...state, collapsed: true };
    case "close":
      return { ...state, collapsed: false };
    case "toggle":
      return { ...state, collapsed: !state.collapsed };
  }
};

const ContextData = React.createContext({
  collapsed: false,
});

const ContextApi = React.createContext({
  open: () => {},
  close: () => {},
  toggle: () => {},
});

const useNavData = () => useContext(ContextData);
const useNavApi = () => useContext(ContextApi);

const NavController = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  const data = useMemo(() => {
    return { collapsed: state.collapsed };
  }, [state]);

  const api = useMemo(() => {
    return {
      open: () => dispatch({ type: "open" }),
      close: () => dispatch({ type: "close" }),
      toggle: () => dispatch({ type: "toggle" }),
    };
  }, []);

  const toggle = useCallback(() => setCollapsed(!collapsed), [collapsed]);

  return (
    <ContextData.Provider value={collapsed}>
      <ContextApi.Provider value={toggle}>{children}</ContextApi.Provider>
    </ContextData.Provider>
  );
};

export default NavController;
```

- useReducer를 사용할 경우 좀 더 유연하게 처리가 가능하다.

예를 들어 state로 toggle을 구현한 경우

```js
const [state, setState] = useState(false);
const toggle = useCallback(() => setState(!state), [state]);
```

setter함수를 사용하기 때문에 state에 의존성이 생긴다.

결국 toggle이 state를 바꾸고 리렌더링을 유발한다. 그리고 useCallback의 dependency에 state을 추가했기 때문에 구독하 api를 구독하는 Provider에서 리렌더링을 유발한다.

그래서 useReducer를 사용해서 useCallback을 useMemo로 전환하고 의존성을 제거하여 불필요한 리렌더링을 방지한다.
