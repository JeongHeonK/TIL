### Using Element Prop

```jsx
const Button = ({
  As = "button",
  size = "m",
  className = "",
  ...otherProps
}) => {
  return <As {...otherProps} className={`${classname}`} />;
};

export default Button;
```

이렇게하면 element를 부모요서에서 지정할 수 있음.

```jsx
const App = () => {
  return (
    <Button As="a" size="m" className={className}>
  )
}
```

어디서 버튼을 anchor 태그 처럼 쓸 수 있었는데, 그게 이 방법이었음.
