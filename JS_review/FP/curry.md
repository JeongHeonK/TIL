### curry

- 인자를 2~3개 받을때, 순차적으로 인자를 전달 받다 함수의 인자 숫자를 만족하면 함수 실행.
- 그전까지는 계속 함수 return
- closure사용

```js
function curry(fn) {
  return (function nextCurried(...prevArgs) {
    return function curried(x) {
      const newArgs = [...prevArgs, x];
      if (fn.length < prevArgs.length) {
        return nextCurried(...newArgs);
      }

      return fn(...prevArgs);
    };
  })([]);
}

const test = (x, y) => x + y;

const curriedTest = curry(test);
```

- 언제 봐도 신기함
- 클로져, 즉시함수, 함수 기본 속성 알아야함

#### this 바인딩

```js
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function (...arg2) {
        return curried.apply(this, args.concat(arg2));
      };
    }
  };
}
```

- 메서드로 호출될 수 있기에 bind해둠.

---

> 참고: [Functional Programming - Currying](../../Functional_Programming/pages/Currying.md) | [Dissecting Currying](../../Functional_Programming/pages/Dissection_Currying.md)
