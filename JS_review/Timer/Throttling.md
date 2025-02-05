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
