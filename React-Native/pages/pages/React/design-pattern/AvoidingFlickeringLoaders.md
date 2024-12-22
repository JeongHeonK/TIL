### Avoiding Flickering Loaders

- 아무리 브라우저가 빨라졌더라도 데이터를 요청 및 응답시 약간의 지연시간이 있다.
- 이 부분 역시 디테일하게 처리해줘야 한다.

```jsx
export const Users = () => {
  const { users, apiStatus, initFetchUsers } = useFetchUsers();

  useEffect(() => {
    initFetchUsers();
  }, [initFetchUsers]);

  switch (apiStatus) {
    case "IDLE":
      return null;
    case "PENDING":
      return <LazyLoader show={apiStatus === "PENDING"} delay={500} />;
    case "ERROR":
      return <p>Error occurred</p>;
    case "SUCCESS":
      return (
        <>
          {users?.map((user) => {
            return (
              <Fragment key={user.id}>
                <h3>{user.name}</h3>
                <h3>{user.email}</h3>
              </Fragment>
            );
          })}
        </>
      );
  }
};

const LazyLoader = ({ show = false, delay = 0, defaultValue = "fetching" }) => {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    let timeout: number;

    if (!show) {
      setShowLoader(false);
      return;
    }

    if (delay === 0) {
      setShowLoader(true);
    } else {
      timeout = setTimeout(() => setShowLoader(true), delay);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [show, delay]);

  return showLoader ? "Loading..." : defaultValue;
};
```
