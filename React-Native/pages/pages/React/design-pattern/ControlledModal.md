### Controlled Modal

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
```

- [기존 모달](./Modal.md)의 경우, Modal 컴포넌트 외부에서 state를 조작할 수 없음.

#### 개선

```tsx
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
```

- props으로 state와 handler함수를 전달받음.
- `forwardRef` `useImperativeHandler`를 통해서도 외부요소로 전달가능 (공통 컴포넌트 전환시 사용함)
