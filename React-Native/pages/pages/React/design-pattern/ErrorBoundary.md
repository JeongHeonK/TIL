### Error Boundary

```js
import React from "react";

export class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFormError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}
```

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ErrorBoundary } from "./error-boundary";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ErrorBoundary fallback={<Error />}>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
```

#### 클래스 컴포넌트 사용 이유

- 아직 `getDerivedStateFormError`에 대해서 동등한 것이 함수 컴포넌트에는 없음.

---

#### 참고

- 컴포넌트도 사실 함수다.
- 특정 컴포넌트에서 에러가 발생하면 호출스택을 타고 전역 범위까지 에러가 올라간다.
- 전역범위까지 전파된 에러는 window.onerror에서 확인가능하다.

- Next.js에서는 App 폴더 최상단에 Error.tsx를 만들면 자동으로 Error를 캐치해준다.
- 근데 요즘 클래스매니저하면서 리액트 과제를 확인하면 Error-boundary를 설정하는 애들을 본적이 없다.
- 나도 안 했던거 같다.
- 개발중에야 error를 확인하며 수정할 수 있다지만, 배포 후에 어쩔것인가.
- 거 참.. 이거 왜 아무도 말 안해주냐
- 그리고 이 `Error Boundary`는 동기적으로 작동하기에 비동기적인 코드의 에러는 또 캐치 못한다.
- 그래서 state로 관리하여 조건부 렌더링을 해줘야 한다.
- 에러가 발생할 상황을 가진 컴포넌트 상단에 `Error Boundary`를 감싸서 페이지 전체가 멈추는 것을 막아줘야 한다.

---

`react-error-boundary` 라이브러리 사용해도 됨
