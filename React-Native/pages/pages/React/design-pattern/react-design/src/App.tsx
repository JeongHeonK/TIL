import { LargeListItems } from "./Components/LargeListItems";
import { RegularList } from "./Components/RegularList";
import { SmallListItems } from "./Components/SmallListItems";

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
