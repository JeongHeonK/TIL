### Memoization by index

```js
function memoizedFib(n) {
  const memo = [];

  function fib(n) {
    if (memo[n] !== undefined) {
      return memo[n];
    }

    if (n < 2) {
      memo[n] = n;
      return n;
    }

    memo[n] = fib(n - 1) + fib(n - 2);
    return memo[n];
  }

  return fib(n);
}
```

#### bottom-up

```js
function fib(n) {
  let fibArr = [];
  fibArr[0] = 0;
  fibArr[1] = 1;

  for (let index = 2; index <= n; index++) {
    fibArr[index] = fibArr[index - 1] + fibArr[index - 2];
  }

  return fibArr[n];
}
```

그러나 피보나치를 계산하는 함수에서는 bottom-up을 사용할 경우 매 함수 실행마다 배열을 생성함.

이 경우 메모리 낭비 발생
