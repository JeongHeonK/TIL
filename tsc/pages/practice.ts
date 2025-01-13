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
