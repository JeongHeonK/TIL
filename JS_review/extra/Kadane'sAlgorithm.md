### Kadane's Algorithm

- 동적 프로그래밍 적용
- 부분 배열이 가질 수 부분함들 중에서 최대 부분합을 구한다.

- 부분 배열의 최대 합 구하기

```js
function maxSubArr(arr) {
  if (arr.length === 0) return 0;

  for (let i = 1; i < arr.length; i++) {
    arr[i] = Math.max(arr[i], arr[i] + arr[i - 1]);
  }

  return Math.max(...arr);
}
```

- 각 배열의 요소를 부분합으로 변환한다.
- 각 배열의 요소의 최대 부분합은 자기 자식 혹은 이전요소와 자기 자신의 합이다.

- 마지막에 다시 한번 최대값을 찾는다 -> 첫번째 요소가 최대값일 수 도 있어서
