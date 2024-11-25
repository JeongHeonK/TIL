### Currying

전달되는 인수가 다를 경우.

```js
const greet = (name, say) => {};
const useRoom = (name, room, enteringTime, leavingTime) => {};
const rest = (name, start, end) => {};

// ???
```

```js
const curryGreeting = (greet) => {
  return (name) => {
    console.log(greet + " " + name);
  };
};

const welcomeGreet = curryGreeting("Welcome");

welcomeGreet("henry");
welcomeGreet("sara");
```

#### Deep Dive

```js
type CurriedFunction<Args extends any[], R> = Args extends [
  infer First,
  ...infer Rest
]
  ? (arg: First) => CurriedFunction<Rest, R>
  : R;

function curry<Args extends any[], R>(
  fn: (...args: Args) => R
): CurriedFunction<Args, R> {
  return (function nextCurried(prevArgs: any[]) {
    return function curried(nextArg: any) {
      const args = [...prevArgs, nextArg];
      if (args.length >= fn.length) {
        return fn(...(args as Args));
      } else {
        return nextCurried(args);
      }
    };
  })([]) as unknown as CurriedFunction<Args, R>;
}
```

- 클로저와 재귀함수, 고차 함수, 일급 객체의 내용이 모두 들어감.
- `function add(a, b, c)`에서 add.length를 할경우 파라미터의 수를 나타냄.

```js
const ffun = function <T extends number>(a: T, b: T, c: T) {
  return a + b + c;
};

const gfun = function <T extends number>(d: T, e: T) {
  return d + e;
};

const hfun = function <T extends number>(f: T, g: T, h: T) {
  return f + g + h;
};

const curriedF = curry(ffun)
const curriedG = curry(gfun)
const curriedH = curry(hfun)

const newFun = pipe (
  curriedF(a)(b),
  // curried함수가 함수를 Return 함.
  // c가 전달되면 값을 return
  curriedG(d),
  // curriedF의 값이 e로 전달되며 홤수 실행 -> 값을 Return
  curriedH(f)(g),
  // h로 curriedG의 return 값이 전달되며 최종 계산 값 Return
)
```

- ㅎㅎ..

```js
const newFunc = pipe(curry(ffun)(a)(b), curry(gfun)(d), curry(hfun)(f)(g));
```

- ㅎㅎㅎ..🫣

```js
const newFunc = pipe(curry(ffun)(1)(2), curry(gfun)(4), curry(hfun)(5)(6));

newFunc(3); // 21
```

```js
const doubleNum = (num) => num + num;

const totalIt = (n1, n2, n3, n4) => n1 + n2 + n3 + n4;

const doArray = (num1, num2) => [num1, num2];

const newFunction = pipe(doubleNum, curry(totalIt)(3)(2)(1), doArray(50));

const result = newFunction(3); // [12, 50]
```

> **부분 적용(Partial Application)**은 함수의 일부 인자만 적용되고, 아직 모든 인자가 적용되지 않은 상태의 함수입니다.
> 즉, 일부 인자가 함수의 클로저 스코프에 고정된 상태로 유지되는 함수를 의미합니다.

---

- 새로운 함수를 만들어 내는것은 좋은데, 이걸 실무에 어떻게 쓰는지, 쓸 수 있는지 감이 하나도 안 잡힌다.
- 직접 구현 보다는 lodash의 curry를 쓰는게 나을 거 같음.
- 객체지향이 선녀로 보인다.
