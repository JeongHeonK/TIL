## useReducer로 useState 구현 및 반대 구현

```tsx
import { useState, useReducer } from "react";

const customReducer = (prev: unknown, action: unknown) =>
  typeof action === "function" ? action(prev) : action;

const useCustomState = (initialState: unknown) => {
  return useReducer(customReducer, initialState);
};

const useCustomReducer = (
  reducer: (...args: unknown[]) => void,
  initialState: unknown,
  init: (...args: unknown[]) => void
) => {
  const [state, setState] = useState(init ? init(initialState) : initialState);
  const dispatch = (action: unknown) =>
    setState((prev: unknown): void => reducer(prev, action));

  return [state, dispatch] as const;
};

export { useCustomState, useCustomReducer };
```
