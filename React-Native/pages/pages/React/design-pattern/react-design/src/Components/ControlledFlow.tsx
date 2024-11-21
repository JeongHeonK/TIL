import React, { ReactElement, ReactNode } from "react";

interface Props {
  children: ReactNode[];
  currentIndex: number;
  onNext: (data: object) => void;
}

export const ControlledFlow = ({ children, currentIndex, onNext }: Props) => {
  const goNext = (dataFromStep: object) => {
    onNext(dataFromStep);
  };

  const currentChild = React.Children.toArray(children)[
    currentIndex
  ] as ReactElement<{ goNext: (data: object) => void }>;

  return (
    React.isValidElement(currentChild) &&
    React.cloneElement(currentChild, { goNext })
  );
};
