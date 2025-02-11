### ReplaceAll

```ts
type ReplaceAll<
  T extends string,
  U extends string,
  V extends string
> = T extends `${infer R}${U}${infer S}` ? ReplaceAll<`${R}${V}${S}`, U, V> : T;

type replaced = ReplaceAll<"t y p e s", " ", "">; // expected to be 'types'
```

- Replace 응용
- 재귀로 품.
- 감을 잡은건지 아닌지 아직 아리송함.
- 어쩌다 품

### AppendArgument

```ts
type Fn = (a: number, b: string) => number;

type AppendArgument<T extends (...args: any[]) => unknown, U> = T extends (
  ...args: infer R
) => infer S
  ? (...args: [...R, U]) => S
  : never;

type Result = AppendArgument<Fn, boolean>;
```

- infer 두 번 사용가능
- 어쩌다 품
