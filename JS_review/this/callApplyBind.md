### call apply bind

#### call

- `call(this[, args1[, args2[, ...]]])`

- 인수 목록을 전달 받음

```js
const person = new Person("so-jung");
person.sayHi(); // 'hi i'm so-jung'

const pSayHi = person.sayHi;
pSayHi(); // error cannot find property of undefined

pSayHi.call(person); // 'hi i'm so-jung'
```

- 주의: `call`은 바로 함수를 실행함.

```js
const person = new Person("so-jung");
person.sayHi(); // 'hi i'm so-jung'

const pSayHi = person.sayHi;
const newPerson = {
  name: "some",
};

pSayHi.call(newPerson); // 'hi i'm some'
```

- 다른 겍체에 기존 메서드 사용 가능

---

#### apply

- `apply(this, [argsArray])`

- call 이랑 비슷

- 다만 인수 목록이 아닌 배열 하나를 전달 받음.

```js
const person = new Person("so-jung");
person.sayHi(); // 'hi i'm so-jung'

const pSayHi = person.sayHi;
pSayHi(); // error cannot find property of undefined

pSayHi.apply(person); // 'hi i'm so-jung'
```

- 주의: `apply`은 바로 함수를 실행함.

```js
Math.max.apply(null, numberArray);

const maximum = (numberArr) => Math.max.apply(null, numberArr);
const minimum = (numberArr) => Math.min.apply(null, numberArr);
```

- 옛날 옛적 스프레드 연산자 없던 시절 이렇게 사용했다고 구전으로 전해짐

---

#### bind

- this가 바인딩된 함수를 return함
- 이제 이 메서드는 언제든 사용될 수 있음.

```js
const sayHiAnywhere = person.sayHi(person);

sayHiAnywhere(); // 'hi i'm so-jung'
sayHiAnywhere(); // 'hi i'm so-jung'
```

- 클로저를 이용한 함수 생성처럼 사용할 수 있음

```js
function applySalesTax(taxRate) {
  return function (price) {
    return price * taxRate;
  };
}

const applySales = applySalesTax(0.725);

applySales(1000);
```

- bind 사용

```js
function applySalesTax(taxRate, price) {
  return price * taxRate;
}

const applySales = applySalesTax.bind(null, 0.725);

applySales(1000);
```

- 개인적으로 함수형 프로그래밍 한다고 클로저 만들어서 메모리 낭비하는 것보다 나아보임

- 이벤트 리스너에서 콜백 내부에서 다른 함수 선언해서 this 연결 끊어졌을 때 사용.(setTimeout같은거)

- 특히 setTimeout은 내부 콜백을 메서드로서 호출하는게 아니라 일반함수로 호출함.

```js
class Timer {
  constructor(start, increment) {
    this.start = start;
    this.increment = increment;
  }

  start() {
    setInterval(function () {
      this.start += this.increment;
      console.log(this);
      console.log(this.start);
    }, 1000);
  }
}
```

- setInterval은 Wep Api에서 계산된 후, queue에서 대기한다.

- 그리고 콜스택이 비었을 경우 setInterval내의 함수를 호출한다. **일반 함수로**

- 즉, this 는 window 객체가 됨

```js
class Timer {
  constructor(start, increment) {
    this.start = start;
    this.increment = increment;
  }

  start() {
    setInterval(this.increment.bind(this), 1000);
  }

  increment() {
    this.start += this.increment;
    console.log(this);
    console.log(this.start);
  }
}
```

#### arrow function

- this 값이 존재하지 않으며 외부에서 가져옴. 마치 bind 된 것 과 같음.

```js
class Timer {
  constructor(start, increment) {
    this.start = start;
    this.increment = increment;
  }

  run() {
    setInterval(() => {
      this.start += this.increment;
      console.log(this);
      console.log(this.start);
    }, 1000);
  }
}
```

화살표 함수 외부의 run이 가진 this 값과 같음

```js
const timer = new Timer(1, 1);

timer.run(); // this = timer

const test = this.run;

test(); // type error cannot find property of undefined
```

그러니 메서드를 일반함수로 선언해버리면 화살표 함수의 this 값은 run이 가진 undefined와 같아진다.

클로저와 this가 합쳐진 느낌임

면접 문제로 내면 다 떨어질듯ㅋㅋ
