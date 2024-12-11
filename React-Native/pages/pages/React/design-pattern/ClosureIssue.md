### Issue cause of closure

```jsx
const MemoizedComp = React.memo(ExpensiveComponent, (before, after) => {
  return before.btnLabel === after.btnLabel;
});

export default function App() {
  const [value, setValue] = useState<string>();

  const handleClick = useCallback(() => {
    console.log(value);
  }, [value]);

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.targe.value)}
      />
      <MemoizedComp btnLabel="click me" onClick={handleClick} />
    </div>
  );
}
```

#### React.memo(Component, 사용자 정의 함수)

- 사용자 정의 함수에서 `true`를 return 하면 리렌더링하지 않는다.

#### 문제점

- 문제는 위와 같이 사용할 경우 update된 value값을 참조하지 못 하고 초기값인 `undefined`만 참조한다.
- 컴포넌트를 Memoization 하면서 가장 처믐 Memo된 컴포넌트를 계속 불러오기 때문
- 그리고 그때 Memo된 함수는 state의 초기값을 클로저로 저장함.
- useCallback으로 저장된 값은 value에 대한 dependency를 가지고 있으나, memo에서 사용된 사용자 정의 함수로 인해 btnLabel 변경이 없으므로 처음 memoization된 컴포넌트만 리턴함.
- 그러나 memo의 사용자 정의 함수를 제거할 경우 useCallback은 항상 새로운 함수를 return 하기에 memo도 계속 리렌더링됨.

---

#### 해결법 Ref 사용

```jsx
const MemoizedComp = React.memo(ExpensiveComponent, (before, after) => {
  return before.btnLabel === after.btnLabel;
});

export default function App() {
  const [value, setValue] = useState<string>();

  const ref = useRef<() => void>();

  const handleClick = useCallback(() => {
    ref.current?.();
  }. [])

  useEffect(() => {
    if (!ref.current) return;

    ref.current = () => {
      console.log(value)
    }
  }, [value])

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.targe.value)}
      />
      <MemoizedComp btnLabel="click me" onClick={handleClick} />
    </div>
  );
}
```

---

#### 참고 memoization

```js
const memo = {};

const myFunc = (value) => {
  if (!memo.current) {
    memo.current = (value) => {
      console.log(value);
    };
  }

  return memo.current;
};

const first = myFunc("one");
const second = myFunc("two");
const third = myFunc("three");

first(); // one
second(); // two
third(); // three
```

이 경우 변수를 하나 더 만들어서 이전 값과 비교하는 작업 필요

```js
const memo = {};
let prevValue = null;

const myFunc = (value) => {
  // 이전 값과 현재 전달된 값 비교 조건 추가
  if (!memo.current || value !== prevValue) {
    memo.current = (value) => {
      console.log(value);
    };
  }

  prevValue = value; // 여기서 이전 값 저장
  return memo.current;
};
```
