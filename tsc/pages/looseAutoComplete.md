### Building LOOSE AUTOCOMPLETE with typeScript

```jsx
type IconSize = "sm" | "xs";

interface IconProps {
  size: IconSize;
}

export const Icon = (props: IconProps) => {
  return <></>;
};

const Comp1 = () => {
  return (
    <div>
      <Icon size="sm" />
      <Icon size="" />
    </div>
  );
};
```

이 경우 auto complete 활성화

```jsx
type IconSize = "sm" | "xs" | string;
```

다른 값을 추가하기 위해 좀 더 일반적인 타입을 추가하면 auto complete가 해제됨

```jsx
type IconSize = "sm" | "xs" | Omit<string, "sm" | "xs">;
```

이 경우 다시 활성화됨.

string이라는 더 넓은 집합에서 sm과 xs를 제거 했으므로

제너릭으로 변환

```js
type LooseAutoComplete<T extends string> =  T | Omit<string, T>
```
