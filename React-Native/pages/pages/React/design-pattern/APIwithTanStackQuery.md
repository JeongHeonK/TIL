### Fetching Data with TanStack-Query

- useQuery를 이용한 layer 생성
- useQuery는 객체를 return 함
- 이 객체 내부에 fetching 상태를 나타내는 flag존재

```js
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TargetComp />
    </QueryClientProvider>
  );
};

const { data, isPending, isError, isSuccess } = useQuery({
  queryKey: ["someKey"],
  queryFn: someFetchFunc,
});
```

---

- 그냥 tanstack-query를 사용할 때는 몰랐는데,
- 데이터 fetching 상태를 직접 구현하고 나서 다시 사용해보니 너무 편하다.
