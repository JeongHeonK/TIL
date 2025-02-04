### setInterval

```js
function counter(limit) {
  let counter = 0;
  const indicatorDiv = document.querySelector("#indicator");

  if (!indicatorDiv) return;

  indicatorDiv.innerText = counter;

  const intervalId = setInterval(() => {
    counter++;
    indicatorDiv.innerText = counter;

    if (counter === limit) {
      clearInterval(intervalId);
    }
  }, 1000);
}
```
