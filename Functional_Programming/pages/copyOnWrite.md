## Copy-On-Write

1. 함수 분리 연습

```jsx
let mailing_list: string[] = [];

function add_contact(email) {
  mailing_list.push(email);
}

function submit_form_handler(event) {
  let form = event.target;
  let email = form.elements["email"].value;

  add_contact(email);
}
```

분리

```js
let mailing_list: string[] = [];

const add_elem = (list: string[], email: string) => {
  const listCopy = list.slice();
  listCopy.push(email);
  return listCopy;
};

const submit_form_handler = (event: MouseEvent) => {
  let form;
  if (event) {
    form = event.target;
  }
  const email = form?.elements["email"].value;
  mailing_list = add_elem(mailing_list, email);
};
```

2. 쓰기를 하면서 읽기도 하는 동작

- 읽기와 쓰기 함수로 각각 분리한다.

```js
// 읽기
function first_element(array) {
  return array[0];
}

// 쓰기
function drop_first(array) {
  array.shift();
}
```

```js
// 쓰기 변경
function drop_first(array) {
  const array_copy = array.slice();
  array_copy.shift();

  return array_copy;
}
```

- 함수에서 값을 두 개 리턴한다.

```js
// 메서드 함수화
function shift(array) {
  array.shift();
}
```

```js
// 카피 온 라이트
function shift(array) {
  const array_copy = array.slice();
  const first = array_copy.shift();

  return {
    first,
    array: array_copy,
  };
}
```

```js
// 읽기 쓰기 함수 조합
function shift(array) {
  return {
    first: first_element(array)
    array: drop_first(array),
  };
}
```

---

### 연습 문제

pop() 메서드 분리

```js
// 읽기
function last_element(array: any[]) {
  return array[array.length - 1];
}

//쓰기
function drop_last(array: any[]) {
  array.pop();
}

// 두 개 값 return
function pop_fake(array: any[]) {
  return {
    last: last_element(array),
    array: drop_last(array),
  };
}

function pop_fake_sec(array: any[]) {
  const newArr = array.slice();
  const last = newArr.pop();

  return {
    last,
    newArr,
  };
}
```

```js
// push 구현 (es6)
function push(array, elem) {
  const newArr = [...array, elem];
  return newArr;
}

function add_contact(mailing_list, email) {
  return push(mailing_list, email);
}
```
