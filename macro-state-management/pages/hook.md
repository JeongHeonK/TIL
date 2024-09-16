## Hook을 분리하는 이유

기존 코드

```jsx
import { useState } from "react";

const Component = () => {
  const [count, setCount] = useState < number > 0;

  const handleAddCount = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <div>
      <p>{count}</p>
      <button onClick={handleAddCount}> + </button>
    </div>
  );
};

export default Component;
```

---

분리된 코드

```jsx
import { MouseEventHandler, useState } from "react";

const Component = () => {
  const [count, handleAddCount] = useCount();

  return (
    <div>
      <p>{count}</p>
      <button onClick={handleAddCount}> + </button>
    </div>
  );
};

export default Component;

const useCount = (): [number, MouseEventHandler<HTMLButtonElement>] => {
  const [count, setCount] = useState < number > 0;

  const handleAddCount = (): void => {
    setCount((prev) => prev + 1);
  };

  return [count, handleAddCount];
};
```

---

### 분리 이유

1. 코드의 가독성 증가 -> 해당 상태가 어떤 상태인지 명시할 수 있다.
2. 관심사의 분리 -> 컴포넌트를 건드리지 않고 기능 추가 가능
3. handler함수 생성해서 바로 return 가능
