### Throttling

- 주로 스크롤 이벤트에 사용
- setTimer 사용
- 몇번 이벤트가 발생하든, 지정한 시간동안 한번의 이벤트 발생

```js
function throttling(fn, duration) {
  let timerId;

  return function (...args) {
    if (timerId) return;
    timerId = setTimeout(() => {
      fn(...args);
      timerId = null;
    }, duration);
  };
}
```

---

### React에서의 Throttle

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
      }, Math.max(wait - (Date.now() - lastTime), 0));
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
