### Immutable updates with useImmer

리액트에서 state 업데이트 시 새로운 객체를 생성해야 한다.

```jsx
function App() {
  const [person, setPerson] = useState({ name: "ga-bi" });

  const onChange = () => {
    // ❌ 작동안함
    person.age = 24;

    // ✅ 작동함
    setPerson({ ...person, age: 24 });
  };

  return <div />;
}

export default App;
```

문제는 서버에서 전달받는 정보는 보통 중첩 객체이다.

그래서 filter, map, spread 연산자 등 복잡한 계산이 필요한다.

#### useImmer 사용

```jsx
import { useImmer } from "use-immer";

function Comp({ loaderData }: Route.componentProps) {
  const [data, setDate] = useImmer(loaderData);

  const handleChange = () => {
    setData((data) => (data.users[i].name = "kim"));
  };
}

export default App;
```

새로운 객체 생성이 아니라 객체 직접 변형해도 반영됨
