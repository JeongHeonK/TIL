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
