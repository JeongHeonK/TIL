### Immutability

- 데이터를 직접 수정하지 않는것

```js
const arr = [1, 2, 3];

const pushElem = (num) => arr.push(num);

pushElem(4);
```

- 이 경우 배열은 전역상태에 존재하며, 어느 함수에서 변경했는지 알 수 없게 됨.
- 얕은 복사를 통해 새로운 배열을 반환한다.

```js
const arr = [1, 2, 3];

const pushElem = (arr, num) => [...arr, num];

const updatedArr = pushElem(arr, 4);
```

---

> 참고: [Functional Programming - immutable](../../Functional_Programming/pages/immutable.md) | [Avoiding Shared State and Mutations](../../Functional_Programming/pages/Avoiding_Shared_State_and_Mutations.md)
