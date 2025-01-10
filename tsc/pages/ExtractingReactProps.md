### Extracting React Props using CONDITIONAL TYPES

```js
const MyComponent = (props: { enabled: boolean }) => {
  return null;
};

type PropsFrom<TComponent> = TComponent extends React.FC<infer Props>
  ? Props
  : never;

type Props = PropsFrom<typeof MyComponent>;
```

- props 타입 추출 가능
- 근데 타입을 props안에 적는 것보다 미리 정의하고 타입할당하는 경우가 대부분
- 신기한데 막상 쓸곳은 없는...

```js
const MyComponent = (props: { enabled: boolean }) => {
  return null;
};

type PropsFrom<TComponent> = TComponent extends (...args: infer Props) => void
  ? Props
  : never;

type Props = PropsFrom<typeof MyComponent>;

```

이걸 더 쓸지도..

근데 이미 `Parameters<type>`있음
