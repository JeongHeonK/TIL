### Observer Pattern

- 'mitt' 라이브러리 사용

#### mitt란?

```
+----------------+      emit('event')       +------+
|                |  ----------------------> |      |
| Child Component |                        | mitt  |
|                |  <---------------------  |      |
+----------------+    on('event', handler)  +------+
```

- child component에서 이벤트를 발생시키면 Mitt에 등록한 On event를 사용한다.

```jsx
export const Buttons = () => {
  const onIncrementCounter = () => {
    emitter.emt("inc");
  };

  const onDecrementCounter = () => {
    emitter.emt("dec");
  };

  return (
    <div>
      <button onClick={onIncrementCounter}>+</button>
      <button onClick={onDecrementCounter}>-</button>
    </div>
  );
};

const Counter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const onIncrement = () => {
      setCount((count) => count + 1);
    };

    const onDecrement = () => {
      setCount((count) => count - 1);
    };
    emitter.on("inc", onIncrement);
    emitter.on("dec", onDecrement);

    return () => {
      emitter.off("inc", onIncrement);
      emitter.off("dec", onDecrement);
      // 이벤트 리스너 구독 초기화
      // 계속 유지할 필요 없음
    };
  }, []);

  return <div>#: {count}</div>;
};

const emitter = mitt();

const Parent = () => {
  return (
    <>
      <Buttons />
      <Counter />
    </>
  );
};
```

- 싱글턴 패턴과 유사해보임.
- emitter라는 하나의 객체를 생성하고 그안에서 메서드를 다루는 느낌
- 이전에 싱글턴을 생성했을 때, 클로저로 최신값을 보긴하나, 리액트 생명주기와 따로 동작해서 리랜더링을 유발하지 않아 값이 없데이트 되지않는 문제가 있었음.
- 그것까지 해결한 패키지로 보임.
- 굳이 전역상태를 생성할 필요없는 상황일 때 사용하면 좋아보임.
- 그러나 unMount시 구독을 초기화할 때, 익숙하지 않다면 초기화를 까먹어서 필요없는 메모리를 낭비하거나 다른 곳에서 emitter 사용 시 원치 않은 동작을 유발할 가능성이 보임.
- 답은 zustand? 아직 개발자로서 이 때는 이거다라고 말할 수 있는 확신이 부족함.
