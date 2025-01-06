### type remove or change

```js
type Letters = "a" | "b" | "c";

type RemoveC<T> = T extends "c" ? never : T;

type TypeWithoutC = RemoveC<Letters>;
```

change

```js
type Letters = "a" | "b" | "c";

type RemoveC<T> = T extends "c" ? "d" : T;

type TypeWithoutC = RemoveC<Letters>;

```
