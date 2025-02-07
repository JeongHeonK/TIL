### Type Lookup

```ts
interface Cat {
  type: "cat";
  breeds: "Abyssinian" | "Shorthair" | "Curl" | "Bengal";
}

interface Dog {
  type: "dog";
  breeds: "Hound" | "Brittany" | "Bulldog" | "Boxer";
  color: "brown" | "white" | "black";
}

type LookUp<T extends { type: string }, K extends T["type"]> = T extends {
  type: K;
}
  ? T
  : never;

type MyDogType = LookUp<Cat | Dog, "dog">; // expected to be `Dog`
```

- type을 집합으로 봐야함.

### Trim Left

```ts
type Space = " " | "\n" | "\t";
type TrimLeft<S extends string> = S extends `${Space}${infer R}`
  ? TrimLeft<R>
  : S;

type trimmed = TrimLeft<"  Hello World  ">; // expected to be 'Hello World  '
```

- 재귀 타입 사용 필요
- 타입으로는 한번에 하나씩만 가능
- 리터럴 타입과 Infer 사용법

### Trim

```ts
type Space = " " | "\n" | "\t";

type TrimLeft<T extends string> = T extends `${Space}${infer R}`
  ? TrimLeft<R>
  : T;

type TrimRight<U extends string> = U extends `${infer R}${Space}`
  ? TrimRight<R>
  : U;

type Trim<V extends string> = TrimLeft<TrimRight<V>>;

type trimmed = Trim<"  Hello World  ">; // expected to be 'Hello World'
```

- 방금 문제 응용해서 품

- union으로 불기

```ts
type Space = " " | "\n" | "\t";

type Trim<T extends string> = T extends
  | `${Space}${infer R}`
  | `${infer R}${Space}`
  ? Trim<R>
  : T;

type trimmed = Trim<"  Hello World  ">; // expected to be 'Hello World'
```
