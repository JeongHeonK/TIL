type Chainable<T = {}> = {
  option<U extends string, V>(
    key: U,
    value: V
  ): Chainable<T & { [key in U]: V }>;
  get(): T;
};

declare const config: Chainable;
const result = config
  .option("foo", 123)
  .option("name", "type-challenges")
  .option("bar", { value: "Hello World" })
  .get();

// expect the type of result to be:
interface Result {
  foo: number;
  name: string;
  bar: {
    value: string;
  };
}
