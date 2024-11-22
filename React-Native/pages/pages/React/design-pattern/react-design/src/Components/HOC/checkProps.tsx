import { ComponentType } from "react";
import { Props } from "../../App";

export const logProps = (Component: ComponentType<Props>) => {
  return (props: Props) => {
    console.log(props);
    return <Component {...props} />;
  };
};
