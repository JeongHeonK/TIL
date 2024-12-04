### Comparing Values

- 원시값의 경우 같은 값으로 취급함.

```js
const x = 3;
const y = 3;

console.log(x === y); // true
```

- 그러나 참조값의 경우 보기에는 같은 데이터로 보여도 메모리 주소값을 할당하기에 다르다고 나옴

```js
const x = { a: 3 };
const y = { a: 3 };

console.log(x === y); // false
```

그래서 dependency에 함수를 추가할 경우 일급객체이므로 다른 값이라 판단해 re-rendering을 유발 할 수 있음.

```jsx
const Comp = () => {
  const submit = () => {};

  useEffect(() => {
    submit();
  // 그래서 submit은 useEffect 내부에서 선언하고 dependency에 추가하지 않는다.
  }, [submit]);

  return ();
};
```
