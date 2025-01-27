#### First Array

```ts
type arr1 = ["a", "b", "c"];
type arr2 = [3, 2, 1];

type First<T extends any[]> = T[0];

type head1 = First<arr1>; // expected to be 'a'
type head2 = First<arr2>; // expected to be 3
```

#### Length of Tuple

```ts
type tesla = ["tesla", "model 3", "model X", "model Y"];
type spaceX = [
  "FALCON 9",
  "FALCON HEAVY",
  "DRAGON",
  "STARSHIP",
  "HUMAN SPACEFLIGHT"
];

type Length<T extends any[]> = T["length"];

type teslaLength = Length<tesla>; // expected 4
type spaceXLength = Length<spaceX>; // expected 5
```

#### Excluded

```ts
type MyExclude<T, K extends T> = T extends K ? never : T;

type Result = MyExclude<"a" | "b" | "c", "a">; // 'b' | 'c'
```

#### awaited

```ts
type ExampleType = Promise<string>;

type ExampleType = Promise<string>;

type MyAwaited<T extends Promise<any>> = T extends Promise<infer U>
  ? U extends Promise<any>
    ? U
    : never
  : never;

type Result = MyAwaited<ExampleType>; // string

type Result = MyAwaited<ExampleType>; // string
```

- `Promise<Promise<any>>`처럼 중첩된 경우일 수 있음.
- 이 경우 재귀를 통해 한번더 풀어줘야 함.
- basic 맞냐
