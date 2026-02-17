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

---

### Next.js에서의 동적 임포트 (next/dynamic)

- Next.js에서는 `React.lazy()` 대신 `next/dynamic`을 사용한다.
- SSR을 비활성화하거나 로딩 컴포넌트를 지정할 수 있다.
- 무거운 컴포넌트(에디터, 차트 등)는 초기 번들에 포함시키지 않는 것이 TTI와 LCP에 직접적 영향을 준다.

```jsx
import dynamic from "next/dynamic";

// SSR 비활성화 + 로딩 컴포넌트 지정
const MonacoEditor = dynamic(
  () => import("./monaco-editor").then((m) => m.MonacoEditor),
  { ssr: false, loading: () => <Loading /> }
);

function CodePanel({ code }) {
  return <MonacoEditor value={code} />;
}
```

---

### Barrel File Import 주의

- `index.js`에서 모든 모듈을 re-export하는 barrel file은 수천 개의 미사용 모듈을 로드할 수 있다.
- 아이콘/UI 라이브러리에서 특히 심각하다 (lucide-react: ~1,583모듈, @mui/material: ~2,225모듈).

```jsx
// Anti-pattern: 전체 라이브러리 로드
import { Check, X, Menu } from "lucide-react";

// 올바른 패턴: 필요한 모듈만 직접 import
import Check from "lucide-react/dist/esm/icons/check";
import X from "lucide-react/dist/esm/icons/x";
import Menu from "lucide-react/dist/esm/icons/menu";
```

Next.js 13.5+에서는 `next.config.js`의 `optimizePackageImports`로 자동 변환할 수 있다.

```js
// next.config.js
module.exports = {
  experimental: {
    optimizePackageImports: ["lucide-react", "@mui/material"],
  },
};
```

---

### 비핵심 서드파티 라이브러리 지연 로드

- Analytics, 에러 트래킹, 로깅 등은 사용자 상호작용을 차단하지 않으므로 hydration 이후에 로드한다.

```jsx
import dynamic from "next/dynamic";

// hydration 이후 로드
const Analytics = dynamic(
  () => import("@vercel/analytics/react").then((m) => m.Analytics),
  { ssr: false }
);
```

---

### 사용자 의도 기반 Preload

- hover/focus 시점에 무거운 번들을 미리 로드하면 체감 속도를 개선할 수 있다.

```jsx
function EditorButton({ onClick }) {
  const preload = () => {
    void import("./monaco-editor");
  };

  return (
    <button onMouseEnter={preload} onFocus={preload} onClick={onClick}>
      Open Editor
    </button>
  );
}
```
