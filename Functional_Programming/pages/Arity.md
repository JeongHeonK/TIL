### Arity

> #### Arity<br />
>
> 논리, 수학, 컴퓨터 과학에서 `Arity`는 함수, 연산 또는 관계에서 취하는 인수 또는 피연산자의 수를 의미.

기존함수 문제점.

```js
const user = getUser(users, 'henry');
const user1 = updateScore(cloneObj(user), 30);
const user2 = updateTries(cloneObj(user1));
const newArr = storeUser(users, user2);

/**
* 각각의 함수마다 인수가 전달되고 있으므로 pipe 함수를 사용할 수 없음.
*/
const updateUser = pipe(
  ??
)
```

#### bind()

- `bind()`는 `apply()`, `call()`과 같이 this를 전달할 때 사용되는 대표적인 함수 중 하나이다.
- 그러나 한가지 다른점은 다른 두 함수와 달리 함수를 바로 실행시키는 것이 아니라 새로운 함수를 생성한다.

```js
const user = partGetUser("henry");

const partGetUser = getUser.bind(null, users);

// 파라미터 전달 순서를 바꿔줘야함.
// const user1 = updateScore(cloneObj(user), 30);
const user1 = updateScore(30, cloneObj(user));

const partUpdateScore30 = updateScore.bind(null, 30);

const user2 = updateTries(cloneObj(user1));

const newArr = storeUser(users, user2);

const updateUser = pipe(
  partGetUser,
  cloneObj,
  partUpdateScore30,
  updateTries
)("henry");
```

---

- bind()함수의 다른 사용법.
- react에서 인수를 전달받아야 할때 `onClick={(arg) => handler(arg)}` 대신 `onClick={handler.bind(null, arg)}`를 사용할 때 익숙해져서 그런가 딱히 거부감은 없다.
- 다만 React에서 `onClick={handler.bind(null, e.target)}`로 사용할 경우 e.target은 이벤트 발생시점이 아니라, 컴포넌트 렌더링 시점에 평가되게 된다. 그래서 엉뚱한 값이 전달된다.
- 그냥 `onClick={(e) => handler(e)}`라고 써야 한다.
