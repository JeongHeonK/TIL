### Combinations && Permutations

#### Combinations(순열)

- 순서를 고려하지 않는다. `[1, 2] === [2, 1]`

```js
const getCombinations = (arr, selectingNum) => {
  const result = [];
  if (selectingNum === 1) return arr.map((elem) => [elem]);

  arr.forEach((fixed, index, origin) => {
    const rest = origin.slice(index + 1);
    const combinations = getCombinations(rest, selectingNum - 1);
    const attached = combinations.map((elem) => [fixed, ...elem]);

    result.push(...attached);
  });

  return result;
};
```

- 여기서 예외처리를 selectNum만 하는 이유는 조건을 충족하지 못할 경우 빈배열을 return한다.

#### Permutation(조합)

- 순서 신경씀
- 다 같은데 rest만 좀 다름

```js
const getPermutations = (arr, selectingNum) => {
  const result = [];
  if (selectingNum === 1) return arr.map((elem) => [elem]);

  arr.forEach((fixed, index, origin) => {
    const rest = [...origin.slice(0, index), ...origin.slice(index + 1)];

    const permutations = getPermutations(rest, selectingNum - 1);
    const attached = permutation.map((elem) => [fixed, ...elem]);

    result.push(...attached);
  });
};
```

- 이런거 풀때마다 파이썬 왜 안했을까 몇번 생각듬
