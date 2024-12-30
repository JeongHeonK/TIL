### Preventing re-renders by lifting components up

state만 lifting하는 것이 아니라, component를 lifting up해서 props로 받아서 렌더링하면 그 컴포넌트의 렌더링을 방지할 수 있다.

```jsx
const Comp = ({ liftUpComp }) => {
  return <div>{liftUpComp}</div>;
};

const App = () => {
  return <Comp liftUpComp={<LiftUpComp />} />;
};
```

비슷한 방법, 함수로 전달해서 호출

> 근데 이건 렌더링되어버림

```jsx
const Comp = ({ LiftUpComp }) => {
  return (
    <div>
      <LiftUpComp />
    </div>
  );
};

const App = () => {
  return <Comp liftUpComp={LiftUpComp} />;
};
```

---

#### 차이점

첫번째 방법은 생성된 컴포넌트를 그대로 전달하는 것. 전달 시점에 이미 렌더링됨.

두번재 방법은 전달 받은 함수를 호출해 새로 컴포넌트를 렌더랑한다. 이를 통해 prop을 전달할 수 있고 좀 더 유연하게 생성할 수 있다.

그러나 두번째 방법은 결국 컴포넌트가 전달받은 컴포넌트를 호출해서 다시 렌더링하기 때문에 비슷해 보여도 우리가 의도했던 prop으로 렌더링을 막는 방법이 적용되지 않는다.

---

#### 그럼 prop으로 전달된 컴포넌트는 왜 렌더링 안되는가?

전달 시점에서 이미

```jsx
const App = () => {
  return <Comp liftUpComp={<LiftUpComp />} />;
};
```

컴포넌트는 생성되어 있다.

**리액트에서 앨리먼트는 불변객체이다.**

JSX를 평가한 결과물로, 한 번 생성되면 변하지 않는 객체를 뜻한다.

그리고 리액트는 얕은 비교를 하기 때문에 객체의 값을 비교할 때 참조 값으로 비교함으로 리렌더링을 건너뛴다.

객체를 전달한다고 useMemo로 감싸는 것과 헷갈리면 안됨. 이 경우는 자식요소 렌더링 막을때 사용하는 것

---

파도파도 끝이 없네🫠
