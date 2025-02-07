### Pure Function

- 사이드 이펙트 없음
- 같은 인수에 대해 항상 같은 값을 return
- 함수는 불변성을 유지한다.

```js
let value = 1;
const notPureFunc = () => value + 1;
notPureFunc();
// 외부 변수 변경 => side effect

const pureFunc = (val) => val + 1;

value = pureFunc(value);

const arr = ["hi", "there"];

const notPurePush = (elem) => arr.push(elem);
notPurePush("bye");

const pushElement = (arr, elem) => [...arr, elem];
const newArr = pushElement(arr, "bye");
// 보통 얕은 복사 사용
```
