### scope

1. local scope
2. Any outer scope
3. Global scope

```js
let age = 40;

function outer() {
  function inner() {
    console.log(age);
  }
  inner();
}

outer(); // 40
```

```js
let age = 40;

function outer() {
  let age = 50;
  function inner() {
    let age = 30;
  }
  inner();
  console.log(age);
}

outer(); // 50
```

- outer environment는 선언 당시에 결정됨, 호출시 결정되는 것이 아님.

```js
const age = 30;

const inner = () => {
  console.log(age);
  // 여기서 결정됨
};

const outer = () => {
  const age = 4000;
  inner();
};

outer(); // 30
```
