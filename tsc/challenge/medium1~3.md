### Get Return Type

```ts
const fn = (v: boolean) => {
  if (v) return 1;
  else return 2;
};

type MyReturnType<T extends (...args: never[]) => unknown> = T extends (
  ...args: any[]
) => infer R
  ? R
  : never;

type a = MyReturnType<typeof fn>; // should be "1 | 2"
```

- any 사용은 지양하는 추세
- `never` 혹은 `unknown` 사용

### Omit

```ts
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type MyOmit<T, K extends keyof T> = {
  [Key in keyof T as Key extends K ? never : Key]: T[Key];
};

type TodoPreview = MyOmit<Todo, "description" | "title">;

const todo: TodoPreview = {
  completed: false,
};
```

- as Key에서 사용되면 이렇게 씀
- Mapped 타입과 as에 대한 이해 부족
