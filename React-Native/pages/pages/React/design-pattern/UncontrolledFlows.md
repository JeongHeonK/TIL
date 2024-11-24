### Uncontrolled Flow

회원가입 혹은 로그인 시 한 form을 제공하는 것이 아니라
한 스탭별로 정보를 입력하고 다음 버튼을 누르는 방식

```jsx
import React, { ReactElement } from "react";
import { ReactNode, useState } from "react";

interface Props {
  children: ReactNode[];
  onDone: boolean;
}

export const UncontrolledFlow = ({ children, onDone }: Props) => {
  const [data, setData] = useState<object>({});
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  const currentChild = React.Children.toArray(children)[
    currentStepIndex
  ] as ReactElement<{ goNext: () => void }>;

  const goNext = () => {
    setCurrentStepIndex((prev) =>
      prev >= React.Children.count(children) - 1 ? 0 : ++prev
    );
  };

  return (
    React.isValidElement(currentChild) &&
    React.cloneElement(currentChild, { goNext: goNext })
  );

  return currentChild;
};
```

사용

```tsx
import { UncontrolledFlow } from "./Components/UncontrolledFlow";

const StepIndicator = ({
  step,
  goNext,
}: {
  step: number;
  goNext?: () => void;
}) => {
  return (
    <>
      <h2>step #{step}</h2>
      <button onClick={goNext}>Next</button>
    </>
  );
};

function App() {
  return (
    <main style={{ width: "100%" }}>
      <UncontrolledFlow onDone={false}>
        <StepIndicator step={1} />
        <StepIndicator step={2} />
        <StepIndicator step={3} />
      </UncontrolledFlow>
    </main>
  );
}

export default App;
```

### Children api

자주사용되는 Children은 react 공식 문서에서는 계속해서 경고를 전달한다.

1. 일반적이지 않고 취약한 코드가 될 수 있다.
2. 렌더링 결과를 포함하지 않는다.

코드 자체의 문제점보다는 휴먼에러에 의한 것으로 보인다.
대표적으로 React.Children.count()를 사용할 경우 하위요소를 순회하지 않고 정확히 children으로 전달된 값을 확인한다.

그리고 렌더링 결과를 확인하지 못하기 때문에 파일을 이동하면서 확인해 실수가 발생할 수 있다.

그래서 `children`을 사용하길 권장한다.

그러나 `children`의 문제는 React에서 불분명한 데이터 구조로 취급한다. 데이터 내부적으로는 배열로 변환되나 하나의 자식만 있다면 React는 따로 배열을 생성하지 않는다.

그리고 Children api에는

- count
- forEach
- map
- only
- toArray

가 있으며 `children`이 배열로 전달되었다는 가정하에 좀 더 안정적으로 조작할 수 있다.

그래서 만약 children.map을 사용해야 하는 상황이 온다면 오히려 `Children.map()`과 `isValidElement()`와 결합해서 사용하는 것이 children을 좀 더 안정적으로 다룰 수 있을 듯하다.
