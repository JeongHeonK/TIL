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
