### Reconciliation Intro

```jsx
const x = <Component />;
```

우리가 만든 컴포넌트는 아래 함수를 통해서 생성된다.

```jsx
const x = React.createElement(Component, null, null);
```

그리고 `createElement()`의 결과 값은 다음과 같다.

```jsx
const x = {
  type: Component,
  props: {},
  ...
}
```

여기서 diffing으로 workInProgress와 current를 비교하는 원리를 알아본다.
