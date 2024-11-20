### Uncontrolled Components

```tsx
import { createRef, FormEvent } from "react";

export const UncontrolledForm = () => {
  const nameInputRef = createRef<HTMLInputElement>();
  const ageInputRef = createRef<HTMLInputElement>();

  const handleSubmit = (e: FormEvent) => {
    if (nameInputRef.current && ageInputRef.current) {
      console.log(nameInputRef.current.value);
      console.log(ageInputRef.current.value);
    }
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" type="text" placeholder="Name" ref={nameInputRef} />
      <input name="age" type="number" placeholder="Age" ref={ageInputRef} />
      <input type="submit" placeholder="Submit" />
    </form>
  );
};
```

#### [createRef](https://ko.react.dev/reference/react/createRef)

- 공식문서에 따르면 클래스 컴포넌트에서 주로 사용하던 기능
- `current`는 처음에는 `null`로 설정된다.
- `createRef`의 경우 항상 다른 객체를 반환
- 그러나 `useRef`의 경우 항상 같은 객체를 반환한다.
- `const ref = useRef()`는 `const [ref, _] = useState(() => createRef(null))`

문서 곳곳에 useRef사용을 권장하고 있음.

```tsx
import { FormEvent, useRef } from "react";

export const UncontrolledForm = () => {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const ageInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    if (nameInputRef.current && ageInputRef.current) {
      console.log(nameInputRef.current.value);
      console.log(ageInputRef.current.value);
    }
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" type="text" placeholder="Name" ref={nameInputRef} />
      <input name="age" type="number" placeholder="Age" ref={ageInputRef} />
      <input type="submit" placeholder="Submit" />
    </form>
  );
};
```

- useRef로 변경할 경우 초기값을 `null`로 명시해야함.
- createRef는 초기값이 null이라고 보장되기 때문에 인자를 전달할 필요가 없음. (애초에 매개변수 전달을 안 받음)
- 단지 `null`을 명시하지 않는 것이 목적이라면 `useRef`을 사용해야 할 것으로 생각됨. (굳이 legacy code 사용으로 가독성 해칠 필요는 없음.)
