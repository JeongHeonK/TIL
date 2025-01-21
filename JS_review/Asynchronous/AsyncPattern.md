### Async Patterns

#### Parallel Async Operation

- 기존 Promise로 작업해야할 경우가 있음.
- 여러 요청을 동기적이 아니라 한번에 받을 때

```js
// promise
const result = [];

fetch("/1").then((r) => result.push(r));
fetch("/2").then((r) => result.push(r));
fetch("/3").then((r) => result.push(r));
```

```js
// async/await
const result = [];

async function getData(num) {
  const response = await fetch(`/${num}`);
  result.push(response);
}

getData(1);
getData(2);
getData(3);
```

#### Sequential Async Operation

- 순서대로 즉 동기적으로
- then method chaining 혹은 await 계속 진행
