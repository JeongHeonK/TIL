### Deep ReadOnly

```ts
type X = {
  x: {
    a: 1;
    b: "hi";
  };
  y: "hey";
};

type Expected = {
  readonly x: {
    readonly a: 1;
    readonly b: "hi";
  };
  readonly y: "hey";
};

type DeepReadonly<T> = {
  readonly [Key in keyof T]: DeepReadonly<T[Key]>;
};

type Todo = DeepReadonly<X>; // should be same as `Expected`
```

- 재귀...

### Tuple to Union

```ts
type Arr = ["1", "2", "3"];

type TupleToUnion<T extends readonly any[]> = T[number];

type Test = TupleToUnion<Arr>; // expected to be '1' | '2' | '3'
```

- 어쩌다 푼듯;;

### Chainable Option

```ts
type Chainable<T = {}> = {
  option<U extends string, V>(
    key: U,
    value: V
  ): Chainable<T & { [key in U]: V }>;
  get(): T;
};

declare const config: Chainable;
const result = config
  .option("foo", 123)
  .option("name", "type-challenges")
  .option("bar", { value: "Hello World" })
  .get();

// expect the type of result to be:
interface Result {
  foo: number;
  name: string;
  bar: {
    value: string;
  };
}
```

- intersection을 이용해서 type을 축적한다.
- 이런 생각은 어떻게 하는건지
