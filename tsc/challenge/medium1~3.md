### Get Return Type

```ts
const fn = (v: boolean) => {
  if (v) return 1;
  else return 2;
};

type MyReturnType<T extends (...args: never[]) => unknown> = T extends (
  ...args: any[]
) => infer R
  ? R
  : never;

type a = MyReturnType<typeof fn>; // should be "1 | 2"
```

- any 사용은 지양하는 추세
- `never` 혹은 `unknown` 사용
