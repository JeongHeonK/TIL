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

  return function (e) {
    if (timerId) clearTimeout(timerId);

    timerId = setTimeout(() => {
      fn(e);
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
  }, 0.5)
);
```

- 이렇게 감싸줘야 함.
- closure, HOF
- 어제 closure 문제 안 풀었으면 클났을듯
