### Permutation

- 가능한가?...

```ts
type Permutation<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation<Exclude<T, K>>]
  : never;

type perm = Permutation<"A" | "B" | "C">; // ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']
```

- 분산조건부 타입
  - 조건부 타입에서 제네릭 타입 T가 "naked type"으로 사용될 경우, 즉 배열이나 튜플 같은 다른 구조로 감싸지지 않은 상태로 T extends ... ? ... : ... 형태로 사용되면, TypeScript는 유니언 타입의 각 구성 요소를 개별적으로 평가
- <K, T = K>는 TypeScript의 제네릭(Generic) 문법에서 사용되는 형식으로, 두 개의 제네릭 타입 매개변수 K와 T를 정의하며, T의 기본값을 K로 설정

### Flatten

```ts
type Flatten<S extends any[], T extends any[] = []> = S extends [
  infer X,
  ...infer Y,
]
  ? X extends any[]
    ? Flatten<[...X, ...Y], T>
    : Flatten<[...Y], [...T, X]>
  : T;

type flatten = Flatten<[1, 2, [3, 4], [[[5]]]]>; // [1, 2, 3, 4, 5]
```

- 재귀타입을 이용해 T를 교체한다.
- 처음 T 기본값을 []로 지정했기 때문에, 값을 넣을 필요 없어짐.
- 처음 동작후 `Flatten<[2, [3, 4], [[[5]]]], [1]>`로 변환
- 그 다음 `Flatten<[[3, 4], [[[5]]]], [1, 2]>`로 변환
- `Flatten<[3, 4, [[5]]], [1, 2]>`
- `Flatten<[[[5]]], [1, 2, 3, 4]>`
- `Flatten<[5], [1, 2, 3, 4]>`
- `Flatten<[], [1, 2, 3, 4, 5]>`
- `[1, 2, 3, 4, 5]`

- 재귀함수보다 어려움
