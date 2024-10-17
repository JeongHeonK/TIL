## async 이터레이터와 제너레이터

- 비동기적으로 들어오는 데이터를 필요에 따라 처리가능

```js
let range = {
  from: 1,
  to: 5,
  [Symbol.asyncIterator]() {
    return {
      current: this.from,
      last: this.to,

      async next() {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      },
    };
  },
};
```

```js
(async () => {
  for await (let value of range) {
    alert(value);
  }
})();
```

### 주의

- 비동기 제너레이터는 `asyncIterator`를 사용함.
- 전개 구문인 `[...gen]`의 경우 일반 `iterator`를 사용하기에 불가

```js
async function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    yield i;
  }
}

(async () => {
  let generator = generateSequence(1, 5);
  for await (let value of generator) {
    alert(value);
  }
})();
```
