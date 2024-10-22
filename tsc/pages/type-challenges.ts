// Pick
type MyPick<T, K extends keyof T> = {
  [key in K]: T[key];
};

const obj = {
  a: 1,
  b: "3",
  c: 4,
};

type test = MyPick<typeof obj, "a">;

// ReadOnly

type MyReadOnly<T> = {
  readonly [key in keyof T]: T[key] extends object
    ? MyReadOnly<T[key]>
    : T[key];
};

// Transforming a Tuple to Object

const tuple = ["test", "model", "and", "so", "on"] as const;
const tupleNumber = [1, 2, 3, 4] as const;
const mixedTuple = ["test", 1, "some", 2] as const;

type ArrayMember = (typeof tuple)[number];

type TupleToObject<T extends readonly any[]> = {
  [k in T[number]]: k;
};

type Test = TupleToObject<typeof tuple>;

// First

type First<T extends any[]> = T extends [infer First, ...any[]] ? First : never;

type TestFirst = First<[1, 2, 3]>;
type TestFirst2 = First<[() => 123, { a: string }]>;
type TestFirst3 = First<[]>;
type testFirst4 = First<[undefined]>;

// Length
type Length<T extends readonly any[]> = T["length"];

type TestLength = Length<typeof tupleNumber>;
type TestLength2 = Length<typeof tuple>;
type TestLength3 = Length<typeof mixedTuple>;

// 만약 tuple이 아니라 일반 배열일 경우 number로 추론됨.
// tuple이 아닐경우 얼마든지 확장가능하기 때문
type ArrayLength<T extends any[]> = T["length"];

const arr = [1, 2, 3];
type TestArrayLength = ArrayLength<typeof arr>;
