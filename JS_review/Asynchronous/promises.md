### Promise

- 비동기 코드를 좀 더 깔끔하게 처리가능함.

```js
fetch(url); // Promise
```

- pending, fulfilled, rejected 3가지 상태를 가짐

#### then, catch

```js
fetch(url)
  .then(() => {})
  .then(() => {})
  .then(() => {})
  .catch(() => {});
```

- then은 성공한 경우
- 이중 여러 then 중 하나라도 Error가 발생할 경우 catch로 넘어간다.
- 그래서 catch는 보통 최하단에 추가함(그다음 finally)

#### promise chaining

```js
fetch(url)
  .then((r) => {
    fetch(url2)
      .then((r2) => {
        fetch(url3)
          .then((r3) => {
            fetch(url4)
              .then(r4)
              .catch((e) => console.error(e));
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  })
  .catch((e) => console.error(e));
```

- ?????

#### promise 객체

- promise 객체를 return 한다면 계속 then을 사용할 수 있다.

```js
fetch(url)
  .then((r) => {
    return fetch(url2);
  })
  .then((r2) => {
    return fetch(url3);
  })
  .then((r3) => {
    return fetch(url4);
  })
  .catch((e) => console.error(e));
```

- 바로 이전 then에서 promise 객체를 return하면 다음 then에서 사용할 수 있다.
- 이걸 이용해 평탄화 진행
- 그리고 어떤 then에서 에러가 발생하든 catch 구문으로 이동하기 때문에 catch 한번만 사용해도 된다.
