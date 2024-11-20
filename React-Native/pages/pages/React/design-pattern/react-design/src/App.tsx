import { useState } from "react";
import { ControlledModal } from "./Components/ControlledModal";

function App() {
  const [shouldDisplay, setShouldDisplay] = useState<boolean>(false);
  return (
    <main style={{ width: "100%" }}>
      <ControlledModal
        shouldDisplay={shouldDisplay}
        onClose={setShouldDisplay.bind(null, false)}
      >
        <h3>it's controlledModal</h3>
      </ControlledModal>
      <button onClick={setShouldDisplay.bind(null, true)}>
        {shouldDisplay ? "hide" : "display"}
      </button>
    </main>
  );
}

export default App;
