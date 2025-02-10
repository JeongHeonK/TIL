### HOC

- 함수를 인자로 전달받거나, 함수를 리턴하는 함수

```js
function doTwice(func) {
  func();
  func();
}

doTwice(() => consol.log("hi"));
```

- HoC에서 사용

```jsx
export default function withAuthentication(WrappedComponent) {
  const AuthenticatedComponent = (props) => {
    const [isAuthenticated, setIsAutenticated] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
      (async function () {
        try {
          await fetch("/login");
          setIsAutenticated(true);
        } catch {
          setError(true);
        }
      })();
    }, []);

    return (
      <>
        {isAuthenticated ? (
          <WrappedComponent {...props} />
        ) : (
          <div>Loading...</div>
        )}
      </>
    );
  };

  return AuthenticatedComponent;
}
```

- 컴포넌트 위에 로그인을 확인하는 컴포넌트를 레이어처럼 한겹 더 올리는 느낌
- 여러 컴포넌트에서 로그인 상태를 조회하는 로직이 필요할 때 사용.
- 요즘은 custom hook으로도 더 사용하는 것 같음.
- HOC로 사용하나 주변 개발자가 못 알아먹으면 망하기 때문
