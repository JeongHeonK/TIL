### Dissecting the Currying function

```js
function curry(fn, arity = fn.length) {
  return (function nextCurried(prevArgs) {
    return function curried(nextArgs) {
      const args = [...prevArgs, nextArgs];
      if (args.length >= arity) {
        return fn(...args);
      }
      return nextCurried(args);
    };
  })([]);
}

const curriedFunc = curry(func);

console.log(curriedFunc.toString());

// function curried(nextArgs) {
//   const args = [...prevArgs, nextArgs];
//   if (args.length >= arity) {
//     return fn(...args);
//   }
//   return nextCurried(args);
// }
```

- `curry()`함수에서 즉시 실행 함수를 return하여 바로 실행한다.
- 그러면서 내부의 `curried()`는 클로저가 되면서 `curry()`함수에서 전달받은 함수와 Arity를 기억하게 된다.
- 그래서 계속 전달받은 함수과 Arity에 접근할 수 있다.
- Arity보다 전달받은 args가 작다면 `nextCurried(args)`를 실행한다. 그러면서 이전에 전달되었던 인수들을 기억한 `curried()`함수를 return 한다.

---

#### curry 함수를 이용한 함수 조합 실습

```js
const users = [
  { name: "james", score: 30, tries: 1 },
  { name: "mary", score: 110, tries: 4 },
  { name: "henry", score: 80, tries: 3 },
];

const storeUser = (arr, user) => {
  return arr.map((val) => {
    if (val.name.toLowerCase() === user.name.toLowerCase()) return user;
    return val;
  });
};

const cloneObj = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

const updateTries = (arr) => {
  if (Array.isArray(arr)) {
    const newTries = arr[1] + 1;

    return [arr[0], newTries];
  }
};

const getUsersUser = pipe(curry(getUser)(users), cloneObj);

const updateHenry = pipe(
  curry(updateScore)(getUsersUser("henry")),
  cloneObj,
  updateTries,
  curry(storeUser)(users)
);
```

---

- 실습보다는 curry 함수 자체가 신기함.
- 즉시 실행함수를 이용해 전달된 인수를 클로저로 기억하는 새로운 함수를 return 하는 방식
- 재귀함수에서 helper function 구현시 count인수를 추가해서 종료조건을 구현한 적이 있었는데, 이 방법 응용하면 필요없는 인수 전달할 필요 없을 거 같음.
