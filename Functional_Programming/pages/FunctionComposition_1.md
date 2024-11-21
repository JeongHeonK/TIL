### FunctionComposition_1

함수를 조합해서 새로운 함수를 만들거나 계산을 하는 것.

#### Functions in Functional Programming

- 입력이 있다.
- 출력이 있다.
- 하나의 일만 수행한다.
- 순수 함수다. -> 재사용성이 좋다.

`check(splits(trim(someStr)))`

- 그러나 코드 실행순서가 읽는 방향과 반대이다. 그리고 중첩되어 있다.
- callback hell 유발할 가능성이 있다.

#### arrow function

```js
var sum = function(num1, num2) => {
  return num1 + num2;
}

var sum = (num1, num2) => num1 + num2;
```

간단해짐. 그러나 this 사용할 시 항상 주의.

기존 함수들 arrow function으로 변경

```js
const boostSingleScores = scores.map((val) => (val < 10 ? val * 10 : val));

const removeOverScores = boostSingleScores.filter((val) => val <= 100);

const removeZeroScores = removeOverScores.filter((val) => val > 0);

const scoreSum = removeZeroScores.reduce((sum, val) => sum + val, 0);

const leftOverCount = removeZeroScores.reduce((cnt) => cnt + 1, 0);
```
