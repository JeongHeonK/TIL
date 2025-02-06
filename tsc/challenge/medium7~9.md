### Last of Array

```ts
type arr1 = ["a", "b", "c"];
type arr2 = [3, 2, 1];

type Last<T extends readonly unknown[]> = T extends [...infer Rest, infer R]
  ? R
  : never;

type tail1 = Last<arr1>; // expected to be 'c'
type tail2 = Last<arr2>; // expected to be 1
```

- spread 연산자가 ts에서 이렇게 쓰인다라는 거 배움.
- js의 Rest parameter랑 헷갈림
- 마지막에만 쓸 수 있는 줄...

### Pop

```ts
type arr1 = ["a", "b", "c", "d"];
type arr2 = [3, 2, 1];

type Pop<T extends readonly unknown[]> = T extends [...infer Rest, infer R]
  ? Rest
  : never;

type re1 = Pop<arr1>; // expected to be ['a', 'b', 'c']
type re2 = Pop<arr2>; // expected to be [3, 2]
```

- 이전 Last 풀면서 이것저것 테스트 하나다 우연히 찾음

### Promise.All

```ts
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise<string>((resolve, reject) => {
  setTimeout(resolve, 100, "foo");
});

const PromiseAll = <T extends readonly unknown[]>(
  arr: T
): Promise<{
  [K in keyof T]: T[K] extends Promise<infer R> ? R : T[K];
}> => {
  return Promise.all(arr.map((item) => Promise.resolve(item))) as any;
};

// expected to be `Promise<[number, 42, string]>`
const p = PromiseAll([promise1, promise2, promise3] as const);
```
