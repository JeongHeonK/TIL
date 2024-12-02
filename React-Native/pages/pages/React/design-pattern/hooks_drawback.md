### Hook 분리와 컴포넌트 분리 고려할 점

```jsx
export const useToggleDialog = () => {
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  });

  return {
    isShow: show,
    show: () => setShow(true),
    hide: () => setShow(false),
  };
};
```

이렇게 되면 hook을 분리했더라도 불러온 컴포넌트에서 return 하는 jsx는 모두 리랜더링이 일어난다.

```jsx
const useCounter = () => {
  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  });

  return null;
};

export const useToggleDialog = () => {
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(0);

  useCount();

  return {
    isShow: show,
    show: () => setShow(true),
    hide: () => setShow(false),
  };
};
```

그래서 hook을 이렇게 분리하더라도 결국 리랜더링을 일으키는 state를 포함하기 때문에 결국 성능 문제가 생긴다.

그래서 return 값 안에 포함된 jsx양을 줄여야한다.
-> 그게 컴포넌트 분리

이 경우 리랜더링을 유발하는 컴포넌트의 양이 줄어들기 때문에 성능 이슈를 해결할 수 있다.

즉, custom hook을 많이 만들고 분리한다고 좋은게 아니라 이 hook이 얼마나 많은 rerendering을 일으키는지, 그리고 관련 없는 리랜더링 node들을 어떻게 구분하고 모두 종합해서 분리해야 한다.
