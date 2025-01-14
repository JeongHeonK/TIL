### Generic Slots

```ts
export const makeKeyRemover =
  <Key extends string>(keys: Key[]) =>
  <Obj>(obj: Obj): Omit<Obj, Key> => {
    return {} as any;
  };

const keyRemover = makeKeyRemover(["a", "b"]);

const newObject = keyRemover({ a: 1, b: 2, c: 3 });
```

- 타입스크립트도 클로저처럼 작용할 수 있는거 처음 알게죔.
