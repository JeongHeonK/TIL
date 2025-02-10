### Capitalize

```ts
type Capitalize1<S extends string> = S extends `${infer R}${infer tail}`
  ? `${Uppercase<R>}${tail}`
  : S;

type capitalized = Capitalize1<"hello world">; // expected to be 'Hello world'
```

- 리터럴 타입이 특별한게 아니었구나.
- 내가 모르는 거였구나.🫠

### Replace

```ts
type Replace<
  T extends string,
  From extends string,
  To extends string
> = T extends `${infer R}${From}${infer S}` ? `${R}${To}${S}` : T;

type replaced = Replace<"types are fun!", "fun", "awesome">; // expected to be 'types are awesome!'
```
