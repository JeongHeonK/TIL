### Using EXTENDS to constrain generics

```js
export const getDeepValue = <
  Obj,
  FirstKey extends keyof Obj,
  SecondKey extends keyof Obj[FirstKey]
>(
  obj: Obj,
  firstKey: FirstKey,
  secondKey: SecondKey
): Obj[FirstKey][SecondKey] => {
  return {} as any;
}

const obj = {
  foo: {
    a: true,
    b: 2,
  },
  bar: {
    c: false,
    d: 4,
  },
};

const result = getDeepValue(obj, "bar", "c");
// 자동완성 가능
```
