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
