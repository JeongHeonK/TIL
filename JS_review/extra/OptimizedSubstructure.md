### Optimized Substructure(최적화된 부분구조)

- 큰 문제를 작은 문제로 분리하는 방법과 비슷함
- 다만 서로 독립적이고, 반복되지 않음
- 분할정복과 동적 프로그래밍에서 사용.

#### Fibonacci sequence

```js
function fib(number) {
  if (number < 0) throw new Error("Invalid Number");
  if (number < 2) return number;

  return fib(number - 1) + fib(number - 2);
}
```

기존 재귀함수로 피보나치를 구현했을 경우 fib(3) 부터 하위 구조가 겹치기 시작함

예를 들면 `fib(7) = fib(6) + fib(5) = fib(5) + fib(4) + fib(5)`로 같은 구조의 반복임
