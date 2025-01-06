### Overlapping SubProblems

- 기존 문제를 반복되는 작은 문제들로 나누는 것.
- 작은 문제들이 명백히 같은 값을 return 한다면 굳이 한번 더 계산할 필요업다.
- memoization 필요
- 보통 배열혹은 객체에 저장

- `Merge Sort`와 비슷함.
- 다만 모두 다른 결과값을 가지게 됨.

```js
const mergeSort = (arr) => {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);

  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
};

const merge = (arr1, arr2) => {
  let result = [];
  let i = 0;
  let j = 0;

  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] > arr2[j]) {
      result.push(arr2[j]);
    } else {
      result.push(arr1[i]);
    }
  }

  if (i < arr1.length) {
    result = result.concat(arr1.slice(i));
  }

  if (j < arr1.length) {
    result = result.concat(arr2.slice(j));
  }

  return result;
};
```

---

합병정렬 외운듯
