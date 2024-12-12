### React Portals

- `createPortal(children, domNode, key?)`

```jsx
{
  createPortal(
    <p>This child is placed in the document body.</p>,
    document.body
  );
}
```

그러나 react는 `body` -> `<div id="app"></div>`에서 실행되며,<br />
다른 라이브러리도 body에 종속되는 경우가 많기에 성능 문제가 발생할 수 있다.

그러므로 보통 분리된 div를 만들어서 그 안에서 사용한다.

```jsx
{
  createPortal(
    <p>This child is placed in the document body.</p>,
    document.querySelector("#alert-holder")
  );
}
```

특이한 점

```jsx
function App() {
  const [show, sheShow] = useState(false);

  return (
    <div onClick={() => console.log("outer")}>
      {show &&
        createPortal(
          <button onClick={() => setShow(!show)}>
            This child is placed in the document body.
          </button>,
          document.querySelector("#alert-holder")
        )}
    </div>
  );
}
```

- `createPortal`로 생성된 위치는 div.app의 바깥쪽이다.
- 그러나 리액트는 real dom의 위치를 알 지 못한다.
- 그래서 jsx의 위치에 따라 이벤트 버블링이 일어난다.
