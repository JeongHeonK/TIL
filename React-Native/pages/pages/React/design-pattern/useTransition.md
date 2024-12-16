### useTransition

`useTransition`은 UI를 차단하지 않고 상태를 업데이트할 수 있는 React Hook

`useDeferredValue`와 다르게 값을 함수의 실행다룬다.

```jsx
const App = () => {
  const [state, setState] = useState("state");
  const [isPending, startTransition] = useTransition();

  const HandleState = (newState: string) => {
    startTransition(() => {
      setState(newState);
    });
  };
};
```

이렇게 되면 setState를 transition 상태로 둔다.

그리고 transition 상태하에 있는 경우를 판단할 때 `isPending`을 사용한다.

반드시 동기적인 코드를 사용해야 한다.

```jsx
const HandleState = (newState: string) => {
  startTransition(() => {
    setTimeout(() => {
      setState(newState);
    }, 10);
  });
};
```

이러면 startTransition이 동작하지 않음.
