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
