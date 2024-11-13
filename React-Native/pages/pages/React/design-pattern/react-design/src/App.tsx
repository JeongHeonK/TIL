import { SplitScreen } from "./Components/split-screen";

function App() {
  return (
    <SplitScreen leftWidth={1} rightWidth={3}>
      <Left title="left" />
      <Right title="right" />
    </SplitScreen>
  );
}

export default App;

type Prop = {
  title: string;
};

const Left = ({ title }: Prop) => {
  return (
    <div>
      <h2>{title}</h2>
    </div>
  );
};

const Right = ({ title }: Prop) => {
  return (
    <div>
      <h2>{title}</h2>
    </div>
  );
};
