#### 1 Pick

```js
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type MyPick<T, K extends keyof T> = {
  [key in K]: T[key];
};

type TodoPreview = MyPick<Todo, "title" | "completed">;

const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
};
```

#### 2 ReadOnly

```js
interface Todo {
  title: string;
  description: string;
}

type MyReadonly<T extends object> = {
  readonly [key in keyof T]: T[key];
};

const todo: MyReadonly<Todo> = {
  title: "Hey",
  description: "foobar",
};

todo.title = "Hello"; // Error: cannot reassign a readonly property
todo.description = "barFoo"; // Error: cannot reassign a readonly property
```

---

#### 3 Tuple to Object

```js
const tuple = ["tesla", "model 3", "model X", "model Y"] as const;

export type TupleToObject<T extends readonly any[]> = {
  [key in T[number]]: key;
};

type result = TupleToObject<typeof tuple>; // expected { 'tesla': 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}
```

- tuple 타임의 원형은 `readOnly any []`
