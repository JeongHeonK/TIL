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
