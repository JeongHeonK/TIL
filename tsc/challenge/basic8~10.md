### If

```ts
type If<T extends boolean, U, V> = T extends boolean ? U : V;

type A = If<true, "a", "b">; // expected to be 'a'
type B = If<false, "a", "b">; // expected to be 'b'
```

### Concat

```ts
type Concat<T extends readonly any[], U extends readonly any[]> = [...T, ...U];

type Result = Concat<[1, 2, 3], [2]>; // expected to be [1, 2, 3, 2]
```

### Includes

```ts
type Includes<T extends any[], U> = {
  [Key in T[number]]: true;
}[U] extends true
  ? true
  : false;

type isPillarMen = Includes<["Kars", "Esidisi", "Wamuu", "Santana"], 3>; // expected to be `false`
```
