### Avoiding Shared State and Mutations

#### Avoiding Shared State

> **공유 상태(Shared State)**란 공유된 스코프에서 존재하거나 스코프 간에 전달되는 객체의 속성으로 존재하는 변수, 객체, 또는 메모리 공간을 의미한다.
> 공유 스코프는 전역 스코프(global scope)나 클로저 스코프(closure scope)를 포함할 수 있다.
>
> **_ Eric Elliott _**

- 공유 상태를 방지하기 위해서는 불변성을 유지해야 한다.

#### Avoiding Mutations

- `const` 사용
- 그러나 참조값을 사용하는 경우 변경 가능 (arr, object ...)

```ts
const arr = [3, 2, 1, 8, 4];

const sortArr = (arr1: typeof arr) => {
  return arr1.sort();
};

const newArr = sortArr(arr);

console.log(arr); // [1, 2, 3, 4, 8]
console.log(newArr); // [1, 2, 3, 4, 8]
```

#### Cloning Objects

1. `Object.assign()`

```js
let obj = {
  name: "hey",
  score: 80,
  completion: true,
};

let obj2 = Object.assign({}, obj);
```

2. spread 연산자 사용

```js
let obj = {
  name: "hey",
  score: 80,
  completion: true,
};

let obj2 = { ...obj };
```

- 얕은 복사이기에 중첩된 객체에 대한 불변성이 보장되지 않음.

3. `JSON.stringify()`, `JSON.parse()`

```js
let obj = {
  name: "hey",
  score: 80,
  completion: true,
  questions: {
    q1: 1,
    q2: 2,
  },
};

let obj2 = JSON.parse(JSON.stringify(obj));
```

#### `JSON.stringify()`, `JSON.parse()` 사용 및 개선

```ts
const arr = [3, 2, 1, 8, 4];

const cloneObj = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

const sortArr = (arr1: typeof arr) => {
  return arr1.sort();
};

const newNum = sortArr(cloneObj(arr));

console.log(arr); // [3, 2, 1, 8, 4]
console.log(newNum); // [1, 2, 3, 4, 8]
```

이전 전역 변수 불변성 문제 해결

```ts
const users = [
  { name: "james", score: 30, tries: 1 },
  { name: "mary", score: 110, tries: 4 },
  { name: "henry", score: 80, tries: 3 },
];

type Users = typeof users;

// Mutable Functions

const cloneObj = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

const recordData = <T>(arr: T, prop: string) => {
  if (Array.isArray(arr) && typeof arr[0] === "string") {
    users.forEach((val, index, array) => {
      if (val.name.toLocaleLowerCase() === arr[0].toLowerCase()) {
        array[index][prop] = arr[1];
      }
    });
  }
};

// Pure Functions

const getScore = <T>(arr: T, name: string) => {
  let targetObj;

  if (Array.isArray(arr)) {
    targetObj = arr.find(
      (user, index) => user[index].name.toLowerCase() === name.toLowerCase()
    );

    return [name, targetObj.score];
  }
};

const getTries = <T>(arr: T, name: string) => {
  let tries: number;

  if (Array.isArray(arr)) {
    targetObj = arr.find(
      (user, index) => user[index].name.toLowerCase() === name.toLowerCase()
    );

    return [name, targetObj.tries];
  }
};

const updateScore = <T>(arr: T, amt: number) => {
  if (Array.isArray(arr)) {
    const newAmt = arr[1] + amt;

    return [arr[0], newAmt];
  }
};

const updateTries = <T>(arr: T) => {
  if (Array.isArray(arr)) {
    const newTries = arr[1] + 1;

    return [arr[0], newTries];
  }
};

let newScore = updateScore(getScore(cloneObj(users), "henry"), 30);
recordData(newScore, "score");
recordData(updateTries(getTries(cloneObj(users), "henry")), "tries");
```

- 재귀함수를 통한 구현방법이 있으나 `JSON.parse(JSON.stringify())`가 좀 더 유연하고 간단함.
- 보통 전개연산자를 많이 썼으나 얕은 복사이기에 문제가 생김.
- 함수형 코딩 책에서는 오히려 얕은 복사를 권장함.
- 데이터 구조나 필요에 따라서 다른 것 같음.
