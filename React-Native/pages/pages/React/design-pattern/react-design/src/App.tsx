import { logProps } from "./Components/HOC/checkProps";

export interface Props {
  testId: number;
  testContext: string;
}

const TestComp = ({ testId, testContext }: Props) => {
  return (
    <div>
      <h4>{testId}</h4>
      <h4>{testContext}</h4>
    </div>
  );
};

const UserInfoWrapper = logProps(TestComp);

function App() {
  return (
    <main style={{ width: "100%" }}>
      <UserInfoWrapper testId={123} testContext="test" />
    </main>
  );
}

export default App;
