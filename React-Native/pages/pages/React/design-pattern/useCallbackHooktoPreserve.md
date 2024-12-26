### useCallback hook to preserve referential integrity

- 동적 렌더링으로 렌더링한 컴포넌트와 Input이 같이 있을 때 고려할 점임.

```jsx
const App = () => {
  const [input, setInput] = React.useState("");
  const [lists, setLists] = React.useState(initialData);

  const deleteList = (id) => {
    setLists((prevLists) => prevLists.filter((list) => list.id !== id));
  };

  const addList = (newList) => {
    setLists((prevLists) => [...prevLists, newList]);
  };

  return (
    <div>
      <InputLists lists={lists} onDelete={deleteList} />
      <Input value={input} onChange={setInput} addList={addList} />
    </div>
  );
};
```

위의 경우 사용자가 입력값을 입력할 때마나 `<InputLists>` 컴포넌트도 리랜더링됨.

```jsx
const InputLists = memo(InputLists);

const App = () => {
  const [input, setInput] = React.useState("");
  const [lists, setLists] = React.useState(initialData);

  const deleteList = (id) => {
    setLists((prevLists) => prevLists.filter((list) => list.id !== id));
  };

  const addList = (newList) => {
    setLists((prevLists) => [...prevLists, newList]);
  };

  return (
    <div>
      <InputLists lists={lists} onDelete={deleteList} />
      <Input value={input} onChange={setInput} addList={addList} />
    </div>
  );
};
```

- 그래서 이렇게 memo를 하더라도 deleteList는 결국 일급함수 -> 참조값이기 때문에 App이 mount되면서 새로운 값이 됨.
- 즉 prop이 계속 바뀐다고 판단함.
- 그러니 `deleteList`도 useCallback으로 감싸야 함.

```js
const deleteList = useCallback((id) => {
  setLists((prevLists) => prevLists.filter((list) => list.id !== id));
}, []);
```

- 저번 팀 프로젝트 제어 컴포넌트랑 같이 렌더링되는 컴포넌트 맡은 양반들 다 이거 안 씀.
- 나도 발견 못 하고 생각도 못 함.
- 망함.
- 내가 맡은 부분에서는 어떻게는 server component로 유지하려고 했기에 아마 컴포넌트 자체가 분리되어서 얻어걸림.
- 아 씁쓸하다.
