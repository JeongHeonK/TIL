interface Props {
  size: "small" | "medium" | "large";
  color: string;
  text: string;
}

export const Buttons = ({ size, color, text, ...props }: Props) => {
  return (
    <button
      {...props}
      style={{
        fontSize:
          size === "small" ? "8px" : size === "medium" ? "16px" : "32px",
        background: color,
      }}
    >
      {text}
    </button>
  );
};

export const RedButton = (props: Omit<Props, "color">) => {
  return <Buttons {...props} color="crimson" />;
};

export const GreenSmallButton = (props: Omit<Props, "color" | "size">) => {
  return <Buttons {...props} color="green" size="small" />;
};
