### Wasted Re-Renders

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

#### 컨텍스트 분리

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
