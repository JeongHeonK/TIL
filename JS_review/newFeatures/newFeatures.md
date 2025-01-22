### new Features

#### `?.`

- undefined에 프로퍼티가 없다는 에러를 방지해줌
- 없으면 undefined

#### `??`

- undefined, null 일 때만 동작
- js의 falsy 값인 0, "", NaN을 고려할 필요 없어짐

#### Numeric Separators

- 10000 -> 10_000으로 적을 수 있음.
- 상수 적을 때, 진작에 쓸걸
- 이래놓고 Js 잘한다고 지원하기 그럼

#### `Array.prototype.at()`

- index로 찾는 것과 같음
- 근데 음수 값 사용가능
- 음수는 -1 부터 시작
- array[array.length - 1] 적는 것보다 나음

#### `||=`

- `x ||= y` => `x || (x = y)`
- 특정 값이 false라면 y를 할당해라.
- 객체 값을 업데이트할때 자주 사용.

#### `&&=`

- 위에꺼랑 비슷
- 참이면 다른 값으로 할당해라

---

- 생각해보니, 요즘 FP가 주인데 굳이 안 사용할 거 같음.
- 불변성을 위해서 새 객체를 만들고 값을 변경하는 것이 아니라, 기존 객체에 직접 접근하여 변경
- 잘 안 쓸거 같음.
- 차라리 특정 변수가 없다면 값을 할당하는 데 사용할거 같다.

#### `??=`

- 비슷, 그냥 초기값 할당할때 사용할 듯

```js
const Comp = ({ user }) => {
  user ??= defaultValue;
  return <div />;
};
```

#### `Promise.any()`

- race와 비슷 다만, 여기서는 가장 빠른 fulfilled 상태의 응답을 Return
- race는 rejected fulfilled 상관없이 가장 빠른 거 찾음
  ㅛㅐ
