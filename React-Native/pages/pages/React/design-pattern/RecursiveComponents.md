### Recursive Component

```js
const myNestedObject: Props = {
  key1: "value1",
  key2: {
    innerKey1: "innerValue1",
    innerKey2: {
      innerInnerKey1: "innerInnerValue1",
      innerInnerKey2: "innerInnerValue2",
    },
  },
  key3: "value3",
};

type Props = {
  [key: string]: string | Props,
};

const isObject = (data: unknown): boolean => {
  return typeof data === "object" && data !== null;
};

export const Recursive = ({ data }: { data: Props | string }) => {
  if (!isObject(data) && typeof data === "string") {
    return <li>{data}</li>;
  }

  const pairs = Object.entries(data);

  return (
    <>
      {pairs.map(([key, value]) => {
        return (
          <li>
            {key}:
            <ul>
              <Recursive data={value} />
            </ul>
          </li>
        );
      })}
    </>
  );
};

export const Test = () => {
  return <Recursive data={myNestedObject} />;
};
```

---

- 재귀를 통해 중첩된 데이터를 평탄화해서 렌더링할 때 사용.
- 문제는 이 패턴의 경우 중첩 데이터는 위계를 가지고 상위 데이터는 제목 하위 데이터는 내용으로 렌더링 되는데 모두 평탄화 시켜버리니 잘 사용하지 않을 것 같음.
- 그러나 재귀 타입 사용 연습 및 기존 컴포넌트를 함수로 보는 관정에서 한번쯤은 공부할 만한 내용이라 생각됨.
