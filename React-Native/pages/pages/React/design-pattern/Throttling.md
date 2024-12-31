### Throttling

일정 시간마다 한번씩 발생하게 함.

```jsx
export const sueMousePosition = () => {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const onMouseEvent = (e) => {
      const { clientX: x, clientY: y } = e;
      setPosition({ x, y });
    };

    window.addEventListener("mousemove", onMouseEvent);

    return () => window.removeEventListener("mousemove", onMouseEvent);
  }, []);
};
```

```js
const throttle = (fn, wait) => {
  let timerId;
  let inThrottle;
  let lastTime;

  return (...args) => {
    if (!inThrottle) {
      lastTime = Date.now();
      inThrottle = true;
    } else {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        if (Date.now() - lastTime >= wait) {
          fn(...args);
          lastTime = Date.now();
        }
      }, Math.max(wait - (Data.now() - lastTime), 0));
    }
  };
};
```

```jsx
export const sueMousePosition = ({ throttleTime = 300 }) => {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const onMouseEvent = throttle((e) => {
      const { clientX: x, clientY: y } = e;
      setPosition({ x, y });
    }, throttleTime);

    window.addEventListener("mousemove", onMouseEvent);

    return () => window.removeEventListener("mousemove", onMouseEvent);
  }, []);
};
```
