type MyGenericType<TData> = {
  data: TData;
};

type Example1 = MyGenericType<{ key: string }>;

type Example2 = MyGenericType<string>;
type Example3 = MyGenericType<number>;

// --------------------------------------

const makeFetch = async (url: string) => {
  return fetch(url).then((res) => res.json());
};

makeFetch("/api/endpoint").then(
  (res: { firstName: string; lastName: string }) => console.log(res)
);

const makeFetchRefactor = async <TData>(url: string): Promise<TData> => {
  return fetch(url).then((res) => res.json());
};

makeFetchRefactor<{ firstName: string; lastName: string }>(
  "/api/endpoint"
).then((res) => console.log(res));

const set = new Set<number | string>();

set.add(1);

set.add("best");

// --------------------------------------

// 굳이 return 타입 적을 필요 없음
const addIdToObject = <T>(obj: T): T & { id: string } => {
  return {
    ...obj,
    id: "112",
  };
};

const addIdToObject2 = <T>(obj: T) => {
  return {
    ...obj,
    id: "112",
  };
};

const result = addIdToObject({
  firstName: "jeongheon",
  lastName: "kim",
});

const result2 = addIdToObject2({
  firstName: "jeongheon",
  lastName: "kim",
});

// --------------------------------------

const getValue = <TObj, TKey extends keyof TObj>(obj: TObj, key: TKey) => {
  if (key === "bad") {
    throw Error("Don't access the bad key");
  }

  return obj[key];
};

const result3 = getValue({ a: 1, b: "some_string", c: true }, "a");

// --------------------------------------
// default parameter

const createSet = <T = string>() => {
  return new Set<T>();
};

const numberSet = createSet<number>();
const otherStringSet = createSet();

// --------------------------------------
