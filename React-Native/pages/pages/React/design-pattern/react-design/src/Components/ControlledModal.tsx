import { ReactNode } from "react";
import styled from "styled-components";

type Props = {
  shouldDisplay: boolean;
  onClose: () => void;
  children: ReactNode;
};

export const ControlledModal = ({
  shouldDisplay,
  onClose,
  children,
}: Props) => {
  return (
    <>
      {shouldDisplay && (
        <ModalBackGround onClick={onClose}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <button onClick={onClose}>Close</button>
            {children}
          </ModalContent>
        </ModalBackGround>
      )}
    </>
  );
};

const ModalBackGround = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  overflow: auto;
  background-color: #00000070;
  width: 100vw;
  height: 100vh;
`;

const ModalContent = styled.div`
  margin: 12% auto;
  padding: 24px;
  background-color: wheat;
  width: 50%;
`;
