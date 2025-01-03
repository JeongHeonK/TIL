### Generic with Context

- useReducer와 context api 사용할 때 주로 사용됨.
- 직접 적을 필요 없어짐

```ts
type Book = {
  author: string;
  title: string;
  price: number;
};

type ActionTypes = `update-${keyof Book}`;

type Actions<T, K extends keyof T> = {
  type: `update-${K}`;
  payload: T[K];
};

type UpdateTitleAction = Action<Book, "price">;
```
