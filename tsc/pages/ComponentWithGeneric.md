### Component With Generic

```jsx
interface TableProps<TItem> {
  items: TItem[];
  renderItem: (item: TItem) => React.ReactNode;
}

export function Table<TItem>(props: TableProps<TItem>) {
  return null;
}

const Comp = () => {
  return (
    <Table items={[{ id: "1" }]} renderItem={(item) => <div>{item.id}</div>} />
  );
};
```

이 경우 props 타입 동적으로 정의 가능

- 다만 이경우 완성된 props가 리액트 엘리먼트로 전달되는 것이 아니라 컴포넌트로 전달된다.
- 그럼 테이블이 렌더링 될 경우 그와 동시에 자식요소가 렌더링된다.
- 그럼 컴포넌트의 변화에 따라 제랜더링되게 된다.
- 이는 불필요한 렌더링을 유발할 위험이 있다.
- 그래서 각각의 컴포넌트를 memo와 useMemo를 통해서 memoization해야 한다.
