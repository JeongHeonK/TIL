### useImperativeHandle

- ref는 부모 컴포넌트에게 자식 컴포넌트의 dom을 노출 시켰다면, useImperativeHandle은 사용자 정의 객체(명령형 핸들)을 노출한다.

```jsx
const Input = forwardRef((props, ref) => {
  const inputRef = useRef < HTMLInputElement > null;

  useImperativeHandle(ref, () => {
    return {
      focus() {
        inputRef.current?.focus()
      },
      scrollIntoView() {
        inputRef.current?.scrollIntoView();
      }
    }
  });

  return <input ref={inputRef} props={...props}/>;
});

const Parent = () => {
  const ref = useRef(null);

  const handleSubmit = () => {
    ref.current.focus();
  }

  const handleScroll = () => {
    ref.current.scrollIntoView();
  }

  return (
    <div>
      <Input ref={ref} />
    </div>
  );
}
```
