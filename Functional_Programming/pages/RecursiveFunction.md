### Recursive Function

```js
const factorial = function (num) {
  if (num === 1) {
    return 1;
  }

  return num * factorial(num - 1);
};
```

```js
const countUp = (n) => {
  if (n < 1) {
    return [];
  } else {
    const countArray = countUp(n - 1);
    countArray.push(n);
    return countArray;
  }
};

const array = countUp(5); // [1, 2, 3, 4, 5]
```
