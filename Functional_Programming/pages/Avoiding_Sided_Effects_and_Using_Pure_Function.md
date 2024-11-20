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

### Using Reduce, Map and Filter

- `reduce` and `reduceRight`: 전달한 콜백함수에 따라 배열을 조합한다. (`reduceRight`는 실행 순서가 반대)
- `map`: 각각의 배열 요소를 콜백함수의 인수로 전달한 후 반환값으로 새로운 배열을 생성한다.
- `filter`: 전달된 함수의 조건에 따라 subset 배열을 만들어 반환한다.

- 세 함수의 공통점은 원본 배열을 변형시키지 않은다.(불변성)

#### 실습

```ts
const scores = [50, 6, 100, 0, 10, 75, 8, 60, 90, 80, 0, 30, 100, 30, 110];

// 1. 10점 이하는 10을 곱한다.

const multiplyTen = scores.map((score) => {
  if (score <= 10) {
    return score * 10;
  }

  return score;
});

// 2. 100 초과인 점수는 제거한다.

const underHundred = multiplyTen.filter((score) => score <= 100);

// 3. 0 이하인 점수는 제거한다.

const overZero = underHundred.filter((score) => score > 0);

// 4. 합을 구한다.

const sum = overZero.reduce((accumulator, score) => accumulator + score, 0);

// 5. 남아있는 배열 요소의 숫자는?

const elemNum = overZero.reduce((count, val) => count + val, 0);
```

- 총합을 구할때로 reduce 사용가능
- reduce 메서드 자체가 하나의 값(어떤 형태든)으로 반환하는 메서드이기에 사용법 익숙해진다면 다양하게 사용할 수 있을 것 같다.

```ts
type Proto = {
  name: string;
};

const storeUser = <T extends Proto, U extends Proto>(array: T[], user: U) => {
  const isValidUser = (elem: T) => {
    if (elem.name?.toLowerCase() === user.name.toLocaleLowerCase()) {
      return user;
    }

    return elem;
  };

  return array.map(isValidUser);
};

const getUser = <T extends Proto>(array: T[], name: string) => {
  return (
    array.find(
      (elem) => elem.name.toLocaleLowerCase() === name.toLocaleLowerCase()
    ) || null
  );
};
```
