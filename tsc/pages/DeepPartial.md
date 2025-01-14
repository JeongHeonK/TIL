### DEEP PARTIAL

```ts
export const deepEqualCompare = <Arg>(a: Arg, b: Arg): boolean => {
  if (
    Array.isArray(a) ||
    Array.isArray(b) ||
    typeof a === "object" ||
    typeof b === "object"
  )
    throw new Error("cannot use reference type");

  return a === b;
};
```

이 경우 함수 실행시 에러 미발생

```ts
deepEqualCompare([], []);
```

```ts
type CheckArgType<T> = T extends object ? "invalid" : T;

export const deepEqualCompare = <Arg>(
  a: CheckArgType<Arg>,
  b: CheckArgType<Arg>
): boolean => {
  if (Array.isArray(a) || Array.isArray(b)) throw new Error("invalid");

  return a === b;
};
```

- 이러헤 타입을 체크하는 제너릭을 만들면 타입레벨에서 검사 가능.
- extends와 리터럴 타입 사용.
- 이거 어떻게 생각하냐
