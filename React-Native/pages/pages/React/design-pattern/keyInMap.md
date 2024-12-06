### map()을 사용할 시, key에 index를 주지 않는 이유

```jsx
const data = [
  { id: "teacher", placeholder: "teacher Id" },
  { id: "student", placeholder: "student Id" },
];

const App = () => {
  const [isChecked, setIsChecked] = useState(false);

  const inputs = isChecked ? [...data].reverse() : data;
  // 여기 있는 로직때문에 문제가 됨.
  return (
    <>
      <input type="checkbox" onChange={() => setIsChecked(!isChecked)}>
        check
      </input>
      {inputs.map((input, index) => {
        <Input key={Index} placeholder={input} />;
      })}
    </>
  );
};
```

[Diffing](./Diffing.md)에서 정리한 내용에 따르면, 리액트는 객체에서 타입과 키가 같을 경우 새로 mount하지 않고 기존 컴포넌트를 사용한다.

그런데 map을 통해 컴포넌트를 랜더링할 때 Key 값으로 index를 주면, 순서를 재정렬하거나 하는 경우에 각 data에 할당된 index가 달라진다.
이 경우 리액트는 다른 컴포넌트라 생각해서 새롭게 mount를 진행한다. 그래서 이것을 방지하기 위해 보통 고유값인 Id을 Key값으로 할당한다.

---

#### 추가, dynamic rendering 아래에 같은 컴포넌트를 추가한다면??

```jsx
const App = () => {
  const [isChecked, setIsChecked] = useState(false);
  const inputs = isChecked ? [...data].reverse() : data;

  return (
    <>
      {inputs.map((input, index) => {
        <Input key={Index} placeholder={input} />;
      })}
      <Input />
    </>
  );
};
```

리액트는 dynamic rendering을 사용한 컴포넌트의 경우 배열을 하나 더 만들어서 그안에 담음으로써 구분한다.

```js
[
  [
    {type: Input, key='a'},
    {type: Input, key='b'},
  ],
  {type: Input},
]
```

그래서 위치를 혼동하지 않는다.
