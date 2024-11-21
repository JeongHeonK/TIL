import React, { Children, ReactElement } from "react";
import { ReactNode, useState } from "react";

interface Props {
  children: ReactNode[];
  onDone: (data: object) => void;
}

export const UncontrolledFlow = ({ children, onDone }: Props) => {
  const [data, setData] = useState<object>({});
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  const currentChild = React.Children.toArray(children)[
    currentStepIndex
  ] as ReactElement<{ goNext: (data: object) => void }>;

  const goNext = (dataFromStep: object) => {
    const nextStepIndex = currentStepIndex + 1;

    const newData = {
      ...data,
      ...dataFromStep,
    };

    setData(newData);

    if (nextStepIndex < Children.count(children)) {
      setCurrentStepIndex(nextStepIndex);
    } else {
      onDone(newData);
    }
  };

  return (
    React.isValidElement(currentChild) &&
    React.cloneElement(currentChild, { goNext: (data: object) => goNext(data) })
  );

  return currentChild;
};
