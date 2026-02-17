### useLayoutEffect

```jsx
function App() {
  const [show, setShow] = useState(false);
  const [top, setTop] = useState(0);
  const buttonRef = useRef(null)

  const useEffect(() => {
    if (buttonRef.current === null || !show) return setTop(0);
    const { bottom } = buttonRef.current.getBoundingClientRect();
    setTop(bottom + 30);
  }, [show])

  return (
    <div>
      <button ref={buttonRef} onClick={() => setShow(!show)}>Show</button>
      {show && (<div className="tooltip" style={{top: `${top}px`}}>some text</div>)}
    </div>
  )
}

export default App;
```

```js
const [show, setShow] = useState(false);
const [top, setTop] = useState(0);
const buttonRef = useRef(null)

const useEffect(() => {
  if (buttonRef.current === null || !show) return setTop(0);
  const { bottom } = buttonRef.current.getBoundingClientRect();
  setTop(bottom + 30);
}, [show])
```

이렇게 할 경우 렌더링 이후 useEffect에서 top을 계산하기 때문에 한번 지연이 발생한다.

그리고 처음 top 값 0으로 나왔고 useEffect내의 `setTop()`이 다시 렌더링을 유발하며 top이 30이 된다.

그래서 택스트 top부분 계산이 뭔가 `0->30`으로 이동하는 듯한 css버그가 발생한다.

---

#### useEffect

리액트의 가장 대표적인 비동기 함수.

외부 상태와 연결, 사이드 이펙트 다루기 등 여러가지 이론이 많지만, 위 내용에서는 **렌더링 이후 실행**되는 콜백함수라는것이 중요하다.

즉, 렌더링이 완료되어야 한다.

```jsx
function App() {
  const [show, setShow] = useState(false);
  const [top, setTop] = useState(0);
  const buttonRef = useRef(null)

  const useEffect(() => {
    if (buttonRef.current === null || !show) return setTop(0);
    const { bottom } = buttonRef.current.getBoundingClientRect();
    setTop(bottom + 30);
  }, [show])

  // 여기게 비즈니스 로직이 많아질 수록 useEffect 실행이 느려짐.
  const now = performance.now()
  while(i < performance.now() - 100) {
    doSomething()
  }

  return ({/** 생략 */})
}

export default App;
```

이 경우, useLayoutEvent 를 사용한다.

브라우저가 다시 화면을 그리기 전에 layout을 측정한다.

즉, 렌더링 이후 실행되는 것이 아니라 렌더링 전에 이미 Top이 30이라는 값을 가지고 시작하게 된다.

그래서 위 상황에서 발생헬 수 있는 에러가 방지됨다.

그러나 성능 문제가 발생할 수 있으므로 왠만하면 useEffect 사용이 권장되며, layout버그 발생 시 useLayoutEffect로 전환한다.

---

### useEffect와 useLayoutEffect 비교

#### useEffect

- 사이드 이펙트를 다루기 위한 훅
- 렌더링이 완료된 후 혹은 어떤 값이 변경되었을 경우 사이드 이펙트를 수행한다.
- layout과 paint가 완료된 후에 비동기적으로 실행된다.
- 만약 DOM에 영항을 주는 코드가 있을 경우 사용자는 화면 깜빡임을 볼 수도 있음.

#### useLayoutEffect

- `useEffect`와 비슷하나 실행시점이 다름.
- 렌더링 후 layout과 paint 전에 동기적으로 실행된다.

---

### 서버 컴포넌트에서의 useLayoutEffect

- `useEffect나` `useLayoutEffect` 모두 자바스크립트 코드가 다운로드 완료될때까지 실행되지 않는다
- 따라서 useLayoutEffect를 사용할 경우 서버에서 렌더링된 화면과 클라이언트에서 렌더된 화면이 다를 수 있다.

```js
import { useEffect, useLayoutEffect } from "react";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default useIsomorphicLayoutEffect;
```

- 위 훅을 사용해서 서버 컴포넌트에 대응한다.
