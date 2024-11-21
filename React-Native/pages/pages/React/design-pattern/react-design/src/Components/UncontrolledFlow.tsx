import React, { ReactElement } from "react";
import { ReactNode, useState } from "react";

interface Props {
  children: ReactNode[];
  onDone: boolean;
}

export const UncontrolledFlow = ({ children, onDone }: Props) => {
  const [data, setData] = useState<object>({});
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  const currentChild = React.Children.toArray(children)[
    currentStepIndex
  ] as ReactElement<{ goNext: () => void }>;

  const goNext = () => {
    setCurrentStepIndex((prev) =>
      prev >= React.Children.count(children) - 1 ? 0 : ++prev
    );
  };

  return (
    React.isValidElement(currentChild) &&
    React.cloneElement(currentChild, { goNext: goNext })
  );

  return currentChild;
};
