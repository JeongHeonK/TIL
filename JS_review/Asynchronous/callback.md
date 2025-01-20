### Callback

- 특정 함수의 실행이 끝나고 다음 함수를 실행하는 것.
- 함수의 실행시점을 사용자가 명시할 수 있음

```js
makeRequest("api/user/:id", (id) => {
  isLogin(id);
});
```

#### 비동기

- js는 싱글스레드이다.
- 즉, 오래 걸리는 작업을 할 경우 브라우저의 모든 동작이 멈춰버린다.
- 그래서 오래걸리는 작업의 경우 뒤로 보낸다음 동기적인 작업부터 먼저 처리한다.(stack > queue)

```js
let result;

const result = new Promise(() => {
  result = 1;
});

console.log(result); // undefined
```

- **_참고_**

- 프로미스 객체 생성은 동기적으로 발생

```js
const result = new Promise((res, rej) => {});

console.log(result); // 프로밋 객체 리턴
```

- 프로미스 객체 리턴함

#### 콜백헬

- 콜백을 사용하면 콜백헬을 피할 수 업게 됨.

```js
fs.readFile("file1.txt", "utf8", function (err, data) {
  if (err) {
    console.error(err);
  } else {
    fs.readFile("file2.txt", "utf8", function (err, data) {
      if (err) {
        console.error(err);
      } else {
        fs.readFile("file3.txt", "utf8", function (err, data) {
          if (err) {
            console.error(err);
          } else {
          }
        });
      }
    });
  }
});
```

ㅋㅋ..
