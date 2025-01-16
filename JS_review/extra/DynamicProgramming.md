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
  const tab = [0, 1, 1];

  const helper = (n) => {
    if (tab[n] === undefined) {
      tab[n] = helper(n - 1) + helper(n - 2);
      return tab[n];
    } else {
      return tab[n];
    }
  };

  return helper(n);
};
```

- 대충 tab으로 만든거
