### Controlled Flow

```tsx
import React, { ReactElement, ReactNode } from "react";

interface Props {
  children: ReactNode[];
  currentIndex: number;
  onNext: (data: object) => void;
}

export const ControlledFlow = ({ children, currentIndex, onNext }: Props) => {
  const goNext = (dataFromStep: object) => {
    onNext(dataFromStep);
  };

  const currentChild = React.Children.toArray(children)[
    currentIndex
  ] as ReactElement<{ goNext: (data: object) => void }>;

  return (
    React.isValidElement(currentChild) &&
    React.cloneElement(currentChild, { goNext })
  );
};
```

사용

```tsx
import { useState } from "react";
import { ControlledFlow } from "./Components/ControlledFlow";

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
  const [data, setData] = useState<{ data: number }>({ data: 0 });
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  const goNext = (dataFromStep: object) => {
    setData({
      ...data,
      ...dataFromStep,
    });

    setCurrentStepIndex(currentStepIndex + 1);
  };

  return (
    <main style={{ width: "100%" }}>
      <ControlledFlow onNext={goNext} currentIndex={currentStepIndex}>
        <StepIndicator step={1} />
        <StepIndicator step={2} />

        {data?.data === 3 && <StepIndicator step={3} />}
        <StepIndicator step={4} />
      </ControlledFlow>
    </main>
  );
}

export default App;
```

- state lifting을 통해 상위 컴포넌트에서 state관리
- 그런데 ControlledFlow에서 children으로의 데이터 전달과정이 숨겨져 있는 것 말고는 딱히 기능상 이점이 보이지 않음.
- 오히려 가독성을 해칠 수 있다는 생각이 듬.
- hook으로 분리하는 것이 더 나아보임
