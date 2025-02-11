type Fn = (a: number, b: string) => number;

type AppendArgument<T extends (...args: any[]) => unknown, U> = T extends (
  ...args: infer R
) => infer S
  ? (...args: [...R, U]) => S
  : never;

type Result = AppendArgument<Fn, boolean>;
// expected be (a: number, b: string, x: boolean) => number
