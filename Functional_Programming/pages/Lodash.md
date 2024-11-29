### Lodash

- curry가 적용되기 쉽도록 먼저 데이터를 받고, `callback` 함수를 받음
- `Lodash-FP`를 사용할 경우, 자동으로 curry가 적용됨.

```js
let sum = _.add(5, 2); // 7

let sum5 = _.add(5); // function()
let result = add5(2); //7
```

```js
const addOne = _.map((num) => num + 1);
const multipleByThree = _.map((num) => num * 3);
const removeNumbersOver100 = _.map((num) => num <= 100);
const sumAllNumbers = _.reduce((sum, num) => sum + num)(0);

const precessNumbers = _.pipe(
  addOne,
  multipleByThree,
  removeNumbersOver100,
  sumAllNumbers,
  console.log
);

precessNumbers([5, 8, 20, 100, 40]); // 108 <- [18, 27, 63]
```

---

- 진작에 알았으면....🫠

#### 실습

```js
const boostSingleScores = _.map((val) => (val < 10 ? val * 3 : val));
const rmOverScores = _.filter((val) => val <= 100);
const rmZeroScores = _.filter((val) => val > 0);
const addSum = _.reduce((sum, num) => sum + num)(0);

const processNum = _.pipe(boostSingleScores, rmOverScores, rmZeroScores);

const getAverage = (length = arr.length, arr) => {
  const sum = addSum(arr);
  return sum / length;
};

const result = processNum([50, 6, 100, 0, 10, 75, 8, 60, 90, 80, 0, 30, 110]);

const computeAverage = _.curry(_.mean);

const processAndGetAverage = _.pipe(processNum, computeAverage);
```

- 조금 더 명확해진게, 절차적 프로그래밍은 값을 조합해서 Return하는 반면, 선언적 프로그래밍은 함수들을 조합해서 함수를 만들어낸다.
- 객체지향과 함수형 중 둘 중 하나다라고 할 수 없고 결국 같이 쓸 수 있는 개념인거 같다.
- 이제 객체지향 해야하나보다.🥲
