type Test = { id: "1" };

type AppendToObject<
  T,
  K extends string | number,
  Value extends any,
> = T extends object
  ? {
      [Key in keyof T | K]: Key extends keyof T ? T[Key] : Value;
    }
  : never;

type Result = AppendToObject<Test, "value", 4>; // expected to be { id: '1', value: 4 }
