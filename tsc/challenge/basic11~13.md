### Push

```ts
type Push<T extends unknown[], U> = [...T, U];

type Result = Push<[1, 2], "3">; // [1, 2, '3']
```

### Unshift

```ts
type Unshift<T extends unknown[], U> = [U, ...T];

type Result = Unshift<[1, 2], 0>; // [0, 1, 2]
```

### Parameters

```ts
type MyParameters<T extends (...rest: any[]) => any> = T extends (
  ...rest: infer R
) => any
  ? R
  : never;

const foo = (arg1: string, arg2: number): void => {};

type FunctionParamsType = MyParameters<typeof foo>; // [arg1: string, arg2: number]
```
