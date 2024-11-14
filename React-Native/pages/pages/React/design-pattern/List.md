### List

```tsx
type Props = {
  author: {
    name: string;
    age: number;
    country: string;
    books: string[];
  };
};

export const LargeListItem = ({ author }: Props) => {
  const { name, age, country, books } = author;
  return (
    <>
      <h2>{name}</h2>
      <p>Age: {age}</p>
      <p>Country: {country}</p>
      <h2>Books</h2>
      <ul>
        {books.map((book) => (
          <li key={book}>{book}</li>
        ))}
      </ul>
    </>
  );
};

type Props = {
  author: {
    name: string;
    age: number;
  };
};

export const SmallListItem = ({ author }: Props) => {
  const { name, age } = author;
  return (
    <p>
      Name: {name}, Age: {age}
    </p>
  );
};

export const RegularList = ({ items, sourceName, ItemComponent }) => {
  return (
    <>
      {items.map((item, i) => (
        <ItemComponent key={i} {...{ [sourceName]: item }} />
      ))}
    </>
  );
};
```

사용

```tsx
import { LargeListItem } from "./Components/LargeListItems";
import { SmallListItem } from "./Components/SmallListItems";
import { RegularList } from "./Components/RegularList";

function App() {
  return (
    <>
      <RegularList
        items={someArray}
        sourceName={keyName}
        ItemComponent={SmallListItems}
      />
      <RegularList
        items={someArray}
        sourceName={keyName}
        ItemComponent={LargeListItems}
      />
    </>
  );
}

export default App;
```
