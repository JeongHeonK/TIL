const MyComponent = (props: { enabled: boolean }) => {
  return null;
};

type PropsFrom<TComponent> = TComponent extends (...args: infer Props) => void
  ? Props
  : never;

type Props = PropsFrom<typeof MyComponent>;
