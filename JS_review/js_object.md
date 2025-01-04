### 객체 복습

객체 추가 방법

```jsx
const o1 = {};
const o2 = new Object();

o1.name = "hey";
o2["age"] = 30;
```

**키 값은 자동으로 `string`으로 변환됨**

```jsx
o1[1] = "hello";
o1["1"] = "bye";

console.log(o1[1]); // bye
```

**Computed Propery Name**

객체 뒤 `[]` 사용시.

```jsx
const test = {
  age: 30,
};
const key = "age";

console.log(test[key]); // 30
```

객체에 property를 동적으로 추가할 때 사용함.

**method**

```jsx
const test = {};

test.method = function () {
  return "test method";
};

test.method();
```
