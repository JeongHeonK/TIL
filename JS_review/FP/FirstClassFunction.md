### 일급 함수

- 함수는 변수에 저장가능

```js
const funcs = [() => 1, () => 2];

console.log(funcs[0]); // [1]
```

```js
function mapFunc(arr, callback) {
  const newArr = [];
  for (const elem of arr) {
    newArr.push(callback(elem));
  }

  return newArr;
}

const newArr = mapFunc([1, 2, 3], (num) => {
  num + 1;
});
```
