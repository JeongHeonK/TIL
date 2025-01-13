### Improving OBJECT.KEYS in TS

```js
export const myObj = {
  a: 1,
  b: 2,
  c: 3,
};

const key = Object.keys(myObj).map((key) => {
  return myObj[key]; // any[] 로 추론
});
```

- 결과값을 any[] 로 추론

```js
export const myObj = {
  a: 1,
  b: 2,
  c: 3,
};

const objectKys = <Obj extends object>(obj: Obj): (keyof Obj)[] => {
  return Object.keys(obj) as (keyof Obj)[];
};

const key = objectKys(myObj).map((key) => {
  return myObj[key];
});
```

- 함수를 만들어서 타입을 명시한다.
- 이 경우 타입 잘 추론함
