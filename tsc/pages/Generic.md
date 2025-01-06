### why use Generic in function

```js
interface Animal {
  name: string;
}

interface Human {
  firstName: string;
  lastName: string;
}

const getDisplayName = <TItem extends Animal | Human>(
  item: TItem
): TItem extends Human
  ? { display: Human["firstName"] }
  : { display: Animal["name"] } => {
  if ("name" in item) {
    return {
      display: item.name,
    };
  }
  return {
    display: item.firstName,
  };
};
```

- generic을 안쓰고 Union을 쓸 경우 인수로 허용되는 타입이 너무 광범위해짐
