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
