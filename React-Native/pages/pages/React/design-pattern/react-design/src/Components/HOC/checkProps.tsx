import { ComponentType } from "react";

export const logProps = (Component: ComponentType<any>) => {
  return (props: any) => {
    console.log(props);
    return <Component {...props} />;
  };
};
