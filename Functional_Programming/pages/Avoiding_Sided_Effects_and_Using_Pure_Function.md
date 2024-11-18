### Avoiding Sided Effects and Using Pure Function

#### sideEffect example

```js
let cnt = 0;

let increment = () => {
  cnt++;

  return cnt;
};
```

- cnt 변수가 어디서 변경될지 모름.

```js
let cnt = 0;

increment();

console.log(cnt);

increment();

console.log(cnt);

increment();

console.log(cnt);
```

- 다른 함수들에게 의존성이 생기게 됨.

#### removing sideEffect

```ts
let increment = (num: number) => (num += 1);

let getAverage = (arr: num[]) => {
  const total = arr.reduce((acc, cur) => acc + cur, 0);
  const average = total / arr.length;

  return average;
};

const average = getAverage([1, 2, 3, 4, 5]);
```

- 함수는 외부 데이터를 변경하는 것이 아니라 인자로 전달받아야 한다.
- 함수는 부수효과를 유발하지 않는다.
- 입력이 같다면 항상 같은 값을 반환한다.

**side effect**

- 전역 데이터를 변경한다.
- 다른 함수의 인수를 변경한다.
- 예외가 발생한다.
- 외부 작업을 유발한다.
- Screen혹은 Logging(console.log 포함)을 유발한다.
- 다른 함수의 side effect를 유발한다.

---

그러나 사이드 이펙트는 결국 발생해야 한다.
함수형 프로그래밍의 목적은 side effect를 무조건적으로 지양하는 것이 아니라 관리하고 불필요한 상황에서 피하는 것이다.

---

#### 실습

```ts
let currentUser = 0;
const users = [
  { name: "james", score: 30, tries: 1 },
  { name: "mary", score: 110, tries: 4 },
  { name: "henry", score: 80, tries: 3 },
];

const updateScore = (newAmt: number) => (users[currentUser].score += newAmt);
const returnUsers = () => users;
const updateTries = () => users[currentUser].tries++;
const updateUser = (newUser: number) => {
  currentUser = newUser;
};
```

시도

```ts
let currentUser = 0;
const users = [
  { name: "james", score: 30, tries: 1 },
  { name: "mary", score: 110, tries: 4 },
  { name: "henry", score: 80, tries: 3 },
];

type Users = typeof users;

const updateScore = (
  newAmt: number,
  currentUserIndex: number,
  users: Users
) => {
  const newUsers = [...users];
  newUsers[currentUserIndex].tries += newAmt;

  return newUsers;
};

const returnUsers = (users: Users) => [...users];

const updateTries = (users: Users, tries: number, currentUser: number) => {
  const newUsers = [...users];
  newUsers[currentUser].tries += tries;

  return newUsers;
};

const updateUser = (newUserNumber: number) => {
  return newUserNumber;
};
```

정답

```ts
const users = [
  { name: "james", score: 30, tries: 1 },
  { name: "mary", score: 110, tries: 4 },
  { name: "henry", score: 80, tries: 3 },
];

type Users = typeof users;

// Mutable Functions

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
  let score: number;

  if (Array.isArray(arr)) {
    score = arr.find(
      (user, index) => user[index].name.toLowerCase() === name.toLowerCase()
    );

    return [name, score];
  }
};

const getTries = <T>(arr: T, name: string) => {
  let tries: number;

  if (Array.isArray(arr)) {
    tries = arr.find(
      (user, index) => user[index].name.toLowerCase() === name.toLowerCase()
    );

    return [name, tries];
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

let newScore = updateScore(getScore(users, "henry"), 30);
recordData(newScore, "score");
recordData(updateTries(getTries(users, "henry")), "tries");
```

#### 배운점

- 일단 기본 동작을 하는 함수부터 만든다.
- 해당 함수의 return 값을 이용해서 점점 고차 함수로 기능을 확장한다.
- side effect를 다루는 함수를 따로 분리해서 점점 더 큰 함수로 확장한다.

#### 해당함수 문제점

- 전역 변수의 값을 바꾸기 때문에 모든 변수가 업데이트된 값을 가진다. -> side effect
