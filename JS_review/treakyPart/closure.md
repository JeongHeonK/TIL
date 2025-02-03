### Closure

```js
function outerFn() {
  const sayHi = "hi";
  return function () {
    console.log(sayHi);
  };
}

const sayHi = outerFn();
sayHi(); // "hi"
```

- gc와 관련있음.
- 어떤 변수든 함수든 참조한다면 gc 대상에 포함되지 않음.
- 그래서 함수 실행이 끝났음에도 그 값에 계속 접근 가능

- 전역 변수를 피하고, 해당 변수를 은닉화할 때 사용

```js
function createCounter() {
  let count = 0;
  return {
    increment() {
      return ++count;
    },
    decrement() {
      return --count;
    },
    getCount() {
      return count;
    },
  };
}
```

- 근데 class #쓰는게 더 좋아보임

```js
function createExponentFn(exp) {
  return function (val) {
    return val ** exp;
  };
}

const square = createExponentFn(2);
const cube = createExponentFn(3);
```

- 전역 변수 피하기

```js
document.querySelector("button").addEventListener(
  "click",
  (function () {
    let count = 1;
    return function () {
      count += 1;

      console.log(count);
    };
  })()
);
```

이거 보니까 좀 알거 같음.

```js
function createCounterBtn(id) {
  const btn = document.getElementById(id);
  let count = 0;

  btn.addEventListener("click", function () {
    count++;
    console.log(count);
    btn.innerText = `Clicked ${count} time`;
  });
}
```

- 그래서 리액트에서 각 함수를 사용해서 컴포넌트별로 각각의 독립된 모듈을 사용하는게 이제 뭔가 알거 같음.

```jsx
export default function Button() {
  const [count, handleClick] = useCount();

  return <button onClick={handleClick}>{count}</button>;
}

const useCount = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount((p) => p + 1);
  };

  return [count, handleClick] as const
}
```

- 위 버튼은 state를 공유하지 않음.
