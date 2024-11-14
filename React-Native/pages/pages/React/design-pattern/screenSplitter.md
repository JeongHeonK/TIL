### ScreenSplitter

```tsx
import { ComponentType } from "react";
import styled from "styled-components";

type Props = {
  Left: ComponentType<object>;
  Right: ComponentType<object>;
};

export const SplitScreen = ({ Left, Right }: Props) => {
  return (
    <Container>
      <Panel>
        <Left />
      </Panel>

      <Panel>
        <Right />
      </Panel>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
`;

const Panel = styled.div`
  flex: 1;
`;
```

사용

```tsx
import { SplitScreen } from "./Components/split-screen";

function App() {
  return <SplitScreen Left={Left} Right={Right} />;
}

export default App;

const Left = () => {
  return (
    <div>
      <h2>Left</h2>
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
```
