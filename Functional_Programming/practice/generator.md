## 제너레이터 추가 정리

- 일반 함수는 하나의 값만을 반환한다.
- 제너레이터를 사용하면 여러 개의 값을 필요에 따라 하나씩 반환(yield)할 수 있다.
- 제너레이터와 이터러블 객체를 함께 사용해서 데이터 스트림을 만들 수 있다.

```js
function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}

// generator 호출 시 제너레이터 객체 반환
let gen = generateSequence();

// yield <Value> 까지 코드 실행
let one = ges.next(); //{value: 1, done: false}
let two = ges.next(); //{value: 2, done: false}
let one = ges.next(); //{value: 3, done: true}
```

제너레이터는 이터러블하다. -> for...of 사용가능

```js
function* generator() {
  yield 1;
  yield 2;
  return 3;
}

let gen = generator();

for (const value of gen) {
  console.log(value); // 1, 2 까지만 출력
}

// 주의 done: true일때 마지막 value를 무시함
// 이 경우 yield만 사용
```

이터러블 객체이므로 전개구문 사용 가능

```js
function* generator() {
  yield 1;
  yield 2;
  return 3;
}

const seq = [0, ...generator()];
```

## 이터러블 객체 구현

```js
let range = {
  from: 1,
  to: 5,

  //for..of 최초 호출 시, Symbol.iterator가 호출됨.
  [Symbol.iterator]() {
    return {
      current: this.from,
      last: this.to,

      next() {
        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      },
    };
  },
};
```

제너레이터 사용시 축약 가능

```js
let range = {
  from: 1,
  to: 5,

  *[Symbol.iterator]() {
    for (let value = this.from; value <= this.to; value++) {
      yield value;
    }
  },
};

const a = [...range]; // [1, 2, 3, 4, 5]
```

### 제너레이터 컴포지션

제너레이터 안에 제너레이터를 `임베딩`하는 기능

```js
function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) yield i;
}

function* generateString() {
  yield* generateSequence(48, 57);
  yield* generateSequence(65, 90);
  yield* generateSequence(97, 122);
}

let str = "";

for (let code of generateString()) {
  str += String.fromCharCode(code);
}
```

- `yield*`는 지시자 실행을 다른 제너레이터에 위임한다.
- `yield*` 다음 오는 제너레이터 함수를 반복 수행하고 산출된 값을 외부로 전달한다.

```js
yield* generateSequence(48, 57);
= for (let i = 48; i <= 57; i++) yield i;
```

### yield를 사용한 제너레이터 정보 교환

```js
function* generator() {
  let result = yield "2 + 2 = ?";

  alert(result);
}

let gen = generator();

let question = gen.next().value; // "2 + 2 = ?"

gen.next(4); //결과를 result 변수에 저장
```

### 연습

```js
function* pseudoRandom(start) {
  let prev = (start * 16807) % 214;
  yield prev;
  prev = (prev * 16807) % 214;
  yield prev;
  prev = (prev * 16807) % 214;
  yield prev;
}
```
