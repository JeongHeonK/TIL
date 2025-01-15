### const

- 타입스크립트는 좀더 일반적인 타입으로 추론한다.
- 배열의 경우 `string[]` 이런 형식으로 추론한다.
- 내부의 요소를 좀 더 엄격하게 관리하고 싶을 때 `const`를 사용해서 타입을 명시한다.

```ts
const arr = ["a", "b", "c", "d"]; // string[]

arr[2] = "3"; //가능

const arr2 = ["a", "b", "c", "d"] as const;
// readonly ["a", "b", "c", "d"]

arr2[2] = "3"; // 불가능
```
