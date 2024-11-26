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
  [key: string]: string | Props;
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
