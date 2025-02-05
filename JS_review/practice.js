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
