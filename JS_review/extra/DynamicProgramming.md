### Dynamic Programming

- 중복되는 부분 문제, 최적 부분 구조

- 항상 사용되는 예시 피보나치

```js
const fib = (n) => {
  if (n <= 2) return 1;

  return fib(n - 1) + fib(n - 1);
};
```

- 기존 재귀
- 문제는 O(2^n)이 나옴

```js
const fib = (n) => {
  if (n <= 2) return 1;

  const tab = [0, 1, 1];

  for (let i = 4; i <= n; i++) {
    tab[i] = tab[i - 1] + tab[i - 2];
  }

  return tab[n];
};
```

- memo

```js
function fib(n, memo = []) {
  if (memo(n) !== undefined) return memo(n);

  if (n <= 2) {
    memo[n] = 1;
    return 1;
  }

  const res = fib(n - 1, memo) + fib(n - 2, memo);
  memo[n] = res;

  return res;
}
```

- 시간복잡도 O(2^n) -> O(n)
