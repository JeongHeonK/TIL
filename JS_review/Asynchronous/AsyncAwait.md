### Async / Await

- await가 일시 정지처럼 Promise의 실행을 기다림.
- 그렇다고 모든 코드의 실행을 막지는 않음.
- 단지 비동기 코드 내에서 동기코드처럼 보이게 해줌
- 최상위 레벨에서는 await사용 불가
- 사용가능하다면 module 설정된 것임

```js
const url = "someUrl";

fetch(url)
  .then((r) => {
    return fetch(`${url}/${r}`);
  })
  .then((r) => console.log(r));

const sameFunc = async (url) => {
  const result = await fetch(url);
  const result2 = await fetch(`${url}/${result}`);

  console.log(result2);
};

sameFunc(url);
```

await 안쓰면 안 기다림

```js
const sameFunc = async (url) => {
  const result = fetch(url);
  const result2 = fetch(`${url}/${result}`);

  console.log(result2);
};

sameFunc(url);
```

이 경우 console.log()부터 실행되며, `Promise<pending>`을 가짐

---

#### Error handling

- `try... catch...`로 진행

```js
const sameFunc = async (url) => {
  try {
    const result = await fetch(url);
    const result2 = await fetch(`${url}/${result}`);

    console.log(result2);
  } catch (e) {
    console.log(e);
  }
};

sameFunc(url);
```
