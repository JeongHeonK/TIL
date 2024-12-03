### Locating an issue

```jsx
export default function App() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Button
        is
        Loading={isLoading}
        iconName="something"
        iconColor="red"
        iconSize="24px"
        avatar={source}
      />
    </>
  );
}

const Buttons = ({ isLoading, iconName, iconColor, iconSize, avatar }) => {
  return <button>Submit {isLoading ? <Loading /> : null}</button>;
};
```

이렇게 Prop이 증가할 수록 유연성과 확장성을 감소시킨다.

```jsx
export default function App() {
  return (
    <>
      <Button icon={<Loading />} />
    </>
  );
}
const Buttons = ({ icon }) => {
  return <button>Submit {icon}</button>;
};
```

차라리 이렇게 컴포넌트로 전달하고 관련 로직은 컴포넌트 내부에서 처리하는 것이 좋음

```jsx
const buttons = ({
  type,
  icon,
  size,
}: {
  type?: string,
  icon: ReactElement,
  size?: string,
}) => {
  const defaultProps = {
    size: size === "lg" ? "lg" : "md",
    color: type === "primary" ? "white" : "black",
  };

  const newProps = {
    ...defaultProps,
    ...icon.props,
  };

  const clonedIcon = React.cloneElement(icon, newProps);

  return <buttons> submit {clonedIcon}</buttons>;
};
```

위처럼 하면 default value를 지정할 수 있음.

7~8월 쯤에 초기값 지정 안되서 원인을 방법을 못 찾았었는데 이제 찾은 것 같다.

```jsx
const newProps = {
  ...defaultProps,
  ...icon.props,
};
```

이 부분 까먹기 쉬우므로 주의할 것.
