### Building a Selector for Context Api

- HOC 사용

```jsx
const withNavClose = (Component: any) => {
  const MemoizedComponent = React.memo(Component);
  return (props: any) => {
    const { close } = useNav();

    return <MemoizedComponent {...props} closeNav={close} />;
  };
};

export default withNavClose;

//Button.tsx

export const CloseButton = withNavClose(
  ({ closeNav }: { closeNav: () => void }) => {
    return <ToggleButton onClick={closeNav}></ToggleButton>;
  }
);
```

- 이렇게 중간에서 메뫌 경우 같은 Prop이 내려온다 판단.
- 리렌더링 방지
- 전역상태 라이브러리에서 사용하는 useSelector 패턴과 비슷함.
