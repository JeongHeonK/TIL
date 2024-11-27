### Compositions

```jsx
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
```

---

- 함수형 프로그래밍에서 low-level의 코드를 만든 후 재사용하는 것과 비슷하다.
- 다만 타입스크립트와 같이 쓸력우 유틸리티 타입으로 props에서 명시한 것들을 제거해줘야 한다.
- 타입스크립트와 함수형 프로그래밍이 궁합이 안 좋은 건지 아니면, 리액트 디자인 패턴 자체가 ts를 고려 안 하고 만들어서 이런지 잘 감이 안 잡힌다.
