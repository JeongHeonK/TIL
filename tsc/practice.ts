type ExampleType = Promise<string>;

type MyAwaited<T extends Promise<any>> = T extends Promise<infer U>
  ? U extends Promise<any>
    ? U
    : never
  : never;

type Result = MyAwaited<ExampleType>; // string
