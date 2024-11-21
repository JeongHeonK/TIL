### Data Collecting with Uncontrolled Flow

- 각 스텝 진행하면서 데이터 수집
- 마지막 스탭에서 전송

```tsx
import React, { Children, ReactElement } from "react";
import { ReactNode, useState } from "react";

interface Props {
  children: ReactNode[];
  onDone: (data: object) => void;
}

export const UncontrolledFlow = ({ children, onDone }: Props) => {
  const [data, setData] = useState<object>({});
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  const currentChild = React.Children.toArray(children)[
    currentStepIndex
  ] as ReactElement<{ goNext: (data: object) => void }>;

  const goNext = (dataFromStep: object) => {
    const nextStepIndex = currentStepIndex + 1;

    const newData = {
      ...data,
      ...dataFromStep,
    };

    setData(newData);

    if (nextStepIndex < Children.count(children)) {
      setCurrentStepIndex(nextStepIndex);
    } else {
      onDone(newData);
    }
  };

  return (
    React.isValidElement(currentChild) &&
    React.cloneElement(currentChild, { goNext: (data: object) => goNext(data) })
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
  goNext?: (data: object) => void;
}) => {
  return (
    <>
      <h2>step #{step}</h2>
      <button
        onClick={() => {
          if (goNext) {
            goNext({ data: step });
          }
        }}
      >
        Next
      </button>
    </>
  );
};

function App() {
  return (
    <main style={{ width: "100%" }}>
      <UncontrolledFlow onDone={() => {}}>
        <StepIndicator step={1} />
        <StepIndicator step={2} />
        <StepIndicator step={3} />
      </UncontrolledFlow>
    </main>
  );
}

export default App;
```

- 데이터 수집으로 넘어가면서, prop으로 함수를 주고 받아보니 어디서 데이터를 모으고 어디서 전달받는지 혼란스러워짐
- 만약 `Children.map()`을 안다면 해당 트래킹해서 어디서 데이터를 생성하고 전달받는지 알 수 있으나 모른다면 러닝 커브가 높아질 것 같음.
- 타입스크립트와 쓸경우 더욱 복잡해지고 타입지정 횟수가 증가해 개발 경험 저하가 우려됨.
- 차라리 커스텀 훅이나 렌더링 prop으로 전달하여 하나의 파일에서 처리하는 것이 더 가독성이 좋아보임.
