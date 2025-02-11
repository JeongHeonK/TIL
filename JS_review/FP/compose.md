### compose

```js
const compose = (...fns) => {
  return (value) => fns.reduce((fn) => fn(value), value);
};
```

- 함수를 조합함.
- reduceRight는 가독성을 위해서 사용됨.
- 보통 왼쪽에서 오른쪽으로 읽기때문.
- 여기에 들어가는 함수는 꼭 값을 return 해야함
