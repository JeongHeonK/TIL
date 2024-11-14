import { LargeListItems } from "./Components/LargeListItems";
import { Modal } from "./Components/Modal";

function App() {
  return (
    <main style={{ width: "100%" }}>
      <Modal>
        <LargeListItems
          author={{
            name: "hey",
            age: 30,
            country: "ko",
            books: ["못팜", "안팜"],
          }}
        />
      </Modal>
    </main>
  );
}

export default App;
