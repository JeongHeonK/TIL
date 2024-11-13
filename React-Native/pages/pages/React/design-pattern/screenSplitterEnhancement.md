```tsx
import { ReactNode } from "react";
import styled from "styled-components";

type Props = {
  children: ReactNode[];
  leftWidth?: number;
  rightWidth?: number;
};

export const SplitScreen = ({
  children,
  leftWidth = 1,
  rightWidth = 1,
}: Props) => {
  const [left, right] = children;
  return (
    <Container>
      <Panel flex={leftWidth}>{left}</Panel>

      <Panel flex={rightWidth}>{right}</Panel>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
`;

const Panel = styled.div<{ flex: number }>`
  flex: ${({ flex }) => flex};
`;
```

사용

```tsx
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
```
