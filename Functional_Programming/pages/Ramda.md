### Ramda

- 자동 커리 적용
- 불변성 및 부수효과 방지
- 파라미터 정의는 커리에 적합하도록 설계

```js
const addThree = R.add(3);
console.log(addTree(5)); // 8
```

조합

```js
const addOne = R.map((num) => num + 1);

const multiByThree = R.map((num) => num * 3);

const removeNumOver100 = R.filter((num) => num <= 100);

const logAndReturn = (data) => {
  console.log(data);
  return data;
};

const sumAllNumbers = R.reduce((sum, num) => sum + num)(0);
```

### Ramda vs Lodash

두 라이브러리 모두 기능상 중복되며, 비슷하다.
그러나 철학에서 약간의 차이가 있다.

#### Lodash

- 유연성과 성능에 중점을 둠.
  일관성, 호환성, 커스터마이징, 성능에 초첨을 둔다.

#### Ramda

- 깔끔한 API 설계를 중시한다.
- 함수 합성을 쉽게 하며, 데이터의 불변성과 부작용 없는 코드를 중시한다.

#### 주요 차이점.

- Lodash는 참조 동일성에 초점을 맞추고, Ramda는 값 동일성에 중점을 둔다.

```js
const getUsersUser = R.pipe(R.curry(getUser)(users), R.clone);

const getHenry = function () {
  return getUsersUser("Henry");
};

const updateHenry = R.pipe(
  R.curry(updateScore)(getHenry()),
  R.clone,
  updateTries,
  R.curry(storeUser)(users)
);
```
