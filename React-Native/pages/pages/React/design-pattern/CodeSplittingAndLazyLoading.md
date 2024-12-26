### Code-Splitting and Lazy-Loading

- 사용자가 접속했을 때, 모든 페이지의 코드를 다 다운받을 필요 없다.

```jsx
import { Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  return (
    <main>
      <NavContainer>
        <Nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </Nav>
      </NavContainer>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </main>
  );
}

export default App;
```

#### Lazy

- 컴포넌트 코드가 처음으로 렌더링 될 때까지 연기한다.
- Suspense 컴포넌트와 함께 사용

```jsx
import { lazy } from "react";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));

function App() {
  return (
    <main>
      <NavContainer>
        <Nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </Nav>
      </NavContainer>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Suspense>
    </main>
  );
}
```

---

- 큰일남
- 최적화를 고려한 리팩토링에서 최적화를 고려한 적이 없다는 것을 깨달음.
- useMemo나 useTransition은 그렇다 쳐도..
  - lazy 한번도 사용안함
  - 렌더링과 연관된 상태와 컴포넌트 분리 안 함.
  - useRef 고려 안함.
  - useImmer 고려 안함.
  - context 사용 시, value 고려안하고 객체로 바로 내려줌.

아이고.
