### Ref as Prop

- ref라는 이름말고 다른 이름을 사용해야 한다.
- React는 ref를 props의 일부로 처리하지 않고 별도로 관리한다.

```jsx
const ref = useRef < HTMLInputElement > null;

return (
  <div>
    <Input ref={ref} /> {/** 불가능 */}
    <Input inputRef={ref} /> {/** 가능 */}
  </div>
);
```

- 아니면 ref를 prop으로 전달할때는 `forwardRef`를 사용해야 한다.

```jsx
const Input = forwardRef((props, ref) => {
  //... 생략
});

const Parent = () => {
  const ref = useRef < HTMLInputElement > null;

  return (
    <div>
      <Input ref={ref} /> {/** 불가능 */}
      <Input inputRef={ref} /> {/** 가능 */}
    </div>
  );
};
```
