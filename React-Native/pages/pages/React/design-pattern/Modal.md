### Modal

```tsx
import { ReactNode, useState } from "react";
import styled from "styled-components";

type Props = {
  children: ReactNode;
};

export const Modal = ({ children }: Props) => {
  const [isShow, setIsShow] = useState(false);

  return (
    <>
      <button onClick={() => setIsShow(true)}>Show Modal</button>
      {isShow && (
        <ModalBackGround onClick={() => setIsShow(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setIsShow(false)}>Close</button>
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
```
