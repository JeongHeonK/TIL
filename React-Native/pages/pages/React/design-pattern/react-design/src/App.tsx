import { SplitScreen } from "./Components/split-screen";

function App() {
  return <SplitScreen Left={Left} Right={Right} />;
}

export default App;

const Left = () => {
  return (
    <div>
      <h2>left</h2>
    </div>
  );
};

const Right = () => {
  return (
    <div>
      <h2>Right</h2>
    </div>
  );
};
