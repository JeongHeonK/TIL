type MyParameters<T extends (...rest: any[]) => any> = T extends (
  ...rest: infer R
) => any
  ? R
  : never;

const foo = (arg1: string, arg2: number): void => {};

type FunctionParamsType = MyParameters<typeof foo>; // [arg1: string, arg2: number]
