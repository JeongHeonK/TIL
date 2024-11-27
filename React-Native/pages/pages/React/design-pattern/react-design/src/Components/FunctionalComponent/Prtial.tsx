import { Buttons } from "./Compositions";

export default function partialComponent(Component: any, partialProps: any) {
  return (props: any) => {
    return <Component {...props} {...partialProps} />;
  };
}

export const RedButton = partialComponent(Buttons, { color: "red" });
export const SmallRedButton = partialComponent(RedButton, { size: "small" });
