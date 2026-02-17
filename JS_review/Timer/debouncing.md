### debouncing

```html
<input type="text" id="search" name="search" />
```

```js
const search = document.getElementById("search");
search.addEventListener("input", async (e) => {
  const q = e.target.value;
  const res = await fetch(`url/search?q=${q}`);
  const result = await res.json();

  const resultDiv = document.createElement("div");
  resultDiv.innerText = result;
  document.body.append(resultDiv);
});
```

- 이 경우 사용자 입력마다 api 요청 발생
- 사용자가 검색을 멈출경우 발생하도록 수정

```js
const search = document.getElementById("search");

const debounce = (fn, duration) => {
  let timerId;

  return function (...args) {
    if (timerId) clearTimeout(timerId);

    timerId = setTimeout(() => {
      fn(...args);
    }, duration * 1000);
  };
};

search.addEventListener(
  "input",
  debounce(async (e) => {
    const q = e.target.value;
    try {
      const res = await fetch(`url/search?q=${q}`);
      const result = await res.json();

      const resultDiv = document.createElement("div");
      resultDiv.innerText = result;
      document.body.append(resultDiv);
    } catch {
      const resultDiv = document.createElement("div");
      resultDiv.innerText = "error occurred";
      document.body.append(resultDiv);
    }
  }, 1)
);
```

- 이렇게 감싸줘야 함.
- closure, HOF
- 어제 closure 문제 안 풀었으면 클났을듯

---

### React에서의 Debounce

검색창 사용시 사용. (모두 다 타이핑하고 요청)

```js
export const debounce = (fn, delay) => {
  let timerId;

  return (...args) => {
    if (timerId) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(() => fn(...args), delay);
  };
};
```

#### 굳이 dependency가 비었는데 useCallback을 사용해야 하는가?

```js
const App = () => {
  const someFunc = useCallback(func, []);

  return; //.. 생략
};
```

이 상태에서 굳이 메모이제이션을 이용해서 외부에서 선언할 필요가 있는가?

```js
const someFunc = () => {
  func();
};

const App () => {

  // .. 여기서 someFunc 불러와도됨.
}
```

외부에서 함수를 선언할 경우 렌더링 시마다 다시 생성되지 않으며 상태나 props와 관계없이 한번만 정의되고 계속해서 재사용된다.

`useCallback`을 내부에서 사용할 때는 상태값을 사용할 경우. 즉, dependency에 상태를 추가할 때 사용하는 게 낫다.
굳이 memoization을 사용해 메모리를 낭비할 필요 없다.
