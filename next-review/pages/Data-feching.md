## Data-fetching

- React에서는 `useEffect`를 사용해 data-fetching 진행
- Next.js에서는 컴포넌트가 promise 객체를 return해도 됨.
- 그러므로 컴포넌트 내에서 직접 요청 진행

```jsx
export default async function SomeComp() {
  const response = await fetch("url");

  if (!response.ok) {
    throw new Error("Failed to fetch news.");
  }

  const data = await response.json();

  return <div>{data}</div>;
}
```

- 서버 컴포넌트는 서버에서만 실행되기 때문에 바로 데이터베이스에 접근하는 코드 실행히도 문제 없음.
- 같은 폴더 경로에 loading.js를 추가하면, loading 처리 가능.
- 페이지 전체가 아니라 부분적인 로딩 처리를 할때는 `<Suspense>` 사용

---

- 서버 컴포넌트에서 클라이언트 컴포넌트로 전환할 때, 클라이언트 컴포넌트로 사용되는 useHook이 1~2의 태그에서 사용된다면 차라리 클라이언트 컴포넌트로 따로 분리하고 서버 컴포넌트 상태를 유지하는 것이 좋음.

---

## Server Action

- Next.js의 특별한 기능이 아니라 React에서 제공하는 기능.

  - React에 내장된 기능이나 next.js와 같은 프레임 워크를 통해서만 사용 가능하다.

- `<form action={serverFunc}`방식으로 사용.
- 일반적으로 `<form>`태그에서는 action이 `URL`을 설정함.
- server action사용 시, react가 자동으로 기본 동작을 막고, 함수를 작동시킴.
- argument로는 `formData`를 받음
- 함수 내에 `"use server"` 명시 <br/>
  파일을 분리하면 최상단에 `"use server"`명시 -> 클라이언트 컴포넌트에서 사용할 경우.

---

### `useFormStatus()`

- `const { pending, data, method, action } = useFormStatus()`
- pending이 로딩중
- `'use client'`를 사용하므로 컴포넌트를 분리해야함.

---

### `useActionState()`

- `import { useActionState } from "react"`
- 양식 관련 UI 업데이트 시 사용.
- `const [state, formAction] = useActionState(fn, initialState, permalink?)`
- useActionState에 사용된 fn은 첫번째 인자로 initialState, 두번째로 formData를 받는다.<br/>
  `fn(prevData, formData)`로 작성해야 작동.

---

### server action 트리거하는 다른 방법

- 버튼 요소에 넣을 때 사용.

  1. 버튼을 form으로 감싼다.

  ```jsx
  <form action={serverFunc}>
    <LikeButton />
  </form>
  ```

  2. `<button>`에 `formAction` attr을 사용한다.

---

### `revalidatePath()`

- next.js는 한번 load함 페이지를 cache에 저장하고 저장된 페이지를 보여주려는 경향이 있다.
- 이때 `revalidatePath()`를 사용하면 업데이트된 페이지가 보여진다.<br/>
  [revalidatePath()](https://nextjs.org/docs/app/api-reference/functions/revalidatePath)
- 데이터를 변경하고 업데이트 되어야 할때 사용된다.
- 첫번째 인자는 path, 두번째는 fileName이 온다.<br/>
  `revalidatePath('/feed', 'page')`
- `revalidatePath('/', 'layout')` 이라고 적으면 모든 페이지 재검증.

---

### Optimistic update in Next.js

- `useOptimistic` 사용<br/>
  [useOptimistic](<https://ko.react.dev/reference/react/useOptimistic#noun-labs-1201738-(2)>)

- `const [optimisticState, addOptimistic] = useOptimistic(state, updateFn)`
- `addOptimistic`을 실행하면 `updateFn`이 실행된다.
