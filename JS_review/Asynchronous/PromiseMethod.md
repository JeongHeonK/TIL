### Promise Method

#### Promise.all()

prPromise.all(`Promise[]`)

- 모든 Promise 객체가 성공해야함.
- 하나라고 reject되면 모두 취소됨

```js
Promise.all(fetchArr)
  .then((r) => console.log(r))
  .catch((e) => console.log(e));
```

- 하나라도 `rejected`되면 catch 구문 실행.
- 물론 아래도 가능

```js
async function getFetches() {
  try {
    const result = await Promise.all(fetchArr);
    console.log(result);
  } catch (e) {
    console.log(e);
  }
}

getFetches();
```

#### Promise.allSettled()

- 약간 다름. `fulfilled` 혹은 `rejected`로 결과가 나오기만 하면 됨

```js
async function allSettled() {
  const results = await Promise.allSettled(fetchArr);

  const fulfilled = results.filter((res) => res.status === "fulfilled");
  const rejected = results.filter((res) => res.status === "rejected");

  return [fulfilled, rejected];
}

allSettled();
```

#### Promise.race()

- 가장 빠른 응답 하나를 가진 new Promise return
- 중요한 건 성공여부가 아니라 `응답`여부
- `fulfilled` 혹은 `rejected`된 결과중 가장 빠른 Promise를 Return 함
