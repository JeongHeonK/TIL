## next.js 복습입니다.

### 심화

- [Routing & Rendering](./pages/Router&Rendering.md)
- [Data-fetching](./pages/Data-feching.md)
- [Cache](./pages/Cache.md)
- [Optimizations](./pages/Optimizations.md)
- [User-Authentication](./pages/User-Authentication.md)

---

### page router

- [page router](./pages/page-route/page-router.md)

---

- app router 기본

---

### layout.js

- 최소 1개 이상의 layout.js가 필요하다.
- children props 사용
- `<head></head>` 컴포넌트 대신 `metadata` 사용

---

### icon

- `icon` 이름을 가진 이미지는 next.js에서 favicon으로 인식한다.

---

### 보호되는 파일명

`app/` 폴더 내부에서만 적용

- page.js
- layout.js
- loading.js
- not-found.js
- error.js
- route.js

---

### Dynamic route

`[]` 를 이용해서 만듬. (폴더 명 혹은 파일명)

- 에시 `@/app/blog/[slug]/page.js`
- page.js에서 작성한 컴포넌트에서 props로 'params' 사용가능
- blog/`입력한 값`이 params에 저장된다.
- params내에 { slug: 'post-1' }이란 값이 저장됨.
- [searchParams]("https://nextjs.org/docs/app/api-reference/file-conventions/page#searchparams-optional")
- params와 같이 props내에서 사용가능. query parameter 조회 가능
- `/shop?a=1&b=2` -> `{ a: '1', b: '2' }`

---

### usePathname과 \<Link\>

[Next.js_doc-usePathname](https://nextjs.org/docs/app/api-reference/functions/use-pathname)

usePathname()을 통해 경로를 알 수 있다.

이를 통해 `<Link>` 컴포넌트에 현재 경로와 같을 경우 active style을 줄 수 있다. -> NavLink사용 법과 비슷.

```jsx
"use client";
import { usePathname } from "next/navigation";
//...생략

const path = usePathname();

//...생략
<Link href="/someUrl" className={path.startsWith("/someUrl") && activeClasses}>
  someUrl
</Link>;
```

---

### img

- 이미지 파일을 `import logoImg from "@/assets/logo.png";` 이런 형식으로 불러올 경우 src 에서는 `logoImg.src`라고 적어줘야 load된다.
- `Image` 사용이 권장됨.
  - 이미지 최적화
  - lazy loading
  - `priority` attr 사용 시, lazy loading 사용 안함
- `fill`
  - 동적으로 이미지를 가져올 경우, next는 원하는 이미지 사이즈를 알 수 없다.
  - 빌드 타임이 아닌 런타임에 이미지를 가져오기 때문.
  - 이 상황에서 `fill` attr을 사용할 수 있음.

---

### 서버 컴포넌트와 클라이언트 컴포넌트

- next.js에서는 서버 컴포넌트와 클라이언트 컴포넌트를 구분한다.
- onClick, useHook등을 사용하려면 'use client'를 최상단에 적어 클라이언트 컴포넌트라는 걸 명시해야 한다.
- 서버 컴포넌트의 이점을 유지하려면, 컴포넌트를 분리하여 최대한 하위 컴포넌트가 클라이언트 컴포넌트가 되도록 한다.

---

### Data fetching

- 서버 컴포넌트에서는 바로 데이터 요청 가능

---

### loading.js

- 자동으로 로딩 시 보여주는 페이지 생성.
- page.js와 비슷하게 폴더 위치에 따라 범위가 달라짐.
- 참고
  - Next.js에서는 들어간 모든 페이지들을 캐싱함.
  - 페이지를 새로고침하거나 재접속할때를 제외하고는 바로 load된다.

---

### `<Suspense>`

- React에서 제공되는 컴포넌트
- 데이터를 불러올 때 까지 대체 내용를 보여줌.
- jsx, sting등

```jsx
<Suspense fallback={<p>Loading...</p>}>
  <SomeComp />
</Suspense>
```

---

### error.js

- error가 발생했을 때 보여줄 페이지.
- page.js와 비슷하게 폴더 위치에 따라 범위가 달라짐.
- props로 error 프로퍼티가 전달됨.
- error.js는 항상 클라이언트 컴포넌트('use client')
- Next.js에서는 에러는 클라이언트 사이드 쪽에서 핸들링하도록 설정함.

---

### not-fount.js

- 잘못된 경로 접근 시, 보여줄 페이지
- page.js와 비슷하게 폴더 위치에 따라 범위가 달라짐.

---

### dangerouslySetInnerHTML={}

- `{}` 사용
- `__html`을 키로 사용
- value로 html코드를 가짐.

```jsx
<p
  dangerouslySetInnerHTML={{
    __html: "html_code",
  }}
></p>
```

---

### notFound()

- Next.js에서 제공하는 함수.
- `import { notFound } from 'next/navigation'`
- 실행 시 현제 경로에서 가장 가까운 not-found.js 페이지를 보여줌.

---

### form `input[type=file]` 커스텀

```jsx
"use client"
import { useRef } from 'react'

export default function Form() {
  const imageInputRef = useRef();

  function handlePickClick(
    imageInputRef.current.click()
  )

  return (
    <div>
      <label htmlFor="image">이름</label>
      <div>
        <input
          type='file'
          id="image"
          accept="image/png, image/jpeg"
          name="image"
          className={{ visibility: "hidden" }}
          ref={imageInputRef}
        />
        <button onClick={handlePickClick}>추가<button>
      </div>
    </div>
  );
}
```

- styling을 위해 input은 hidden으로 숨긴 뒤, `button`으로 조작.
- useRef 사용
- ref.current.click()

---

### upload image 미리보기

```jsx
function handleImageChange(e) {
  const file = e.target.files[0];

  if (!file) {
    setPickedImage(null);
    return;
  }

  const fileReader = new FileReader();

  fileReader.onload = () => {
    setPickedImage(fileReader.result);
  };

  fileReader.readAsDataURL(file);
}
```

- `FileReader()` 사용
- `fileReader.readAsDataURL(file)`은 아무것도 return 하지 않음.
- `fileReader.onload = () => {}`를 통해 생성
- 위 함수 내부에서 `fileReader.result`로 url에 접근

---

### 서버 액션

- 함수 내에 `'use server'` 명시
  - 서버에서 동작한다는 뜻.
- 함수는 async function으로 전환
- form 태그의 action의 attr로 저장
  - `<form action={serverFunc}>`
- server 함수는 인수로 formData를 전달 받음.
- `'use client'`와 혼용해서 쓸 수 없다.
  - 그러나 개별 파일로 분리할 경우 사용 가능
  - 서버코드가 있는 파일에는 `'use server'`를 상단에 명시.
  - `'use client'`가 적힌 곳에서 import 할 경우 사용 가능.
- redirect()
  - `import { redirect } from 'next/navigation'`
  - next에서 제공.
  - 다른 페이지로 이동하는 기능 제공.

---

### slugify xss 라이브러리

- slugify

  - 일반적으로 URL이나 파일 경로 등에 사용되는 문자열을 만들기 위한 텍스트 변환 기술
  - Slug는 주로 제목이나 이름과 같은 텍스트를 URL에 포함시키기 위해 사용
  - 공백이나 특수 문자를 제거하고 대소문자를 일관되게 처리한다.

- xss
  - xss 공격을 방지하기 위한 라이브러리

---

### `useFormStatus()`

- 'react-dom'에서 제공
- 클라이언트 컴포넌트에서 사용 가능.
- `<form>` 태그 내에만 있다면 사용 가능. -> `<form>`태그 내에서 UI를 변화시킬 컴포넌트만 분리해서 만든 후 그 안에서도 `useFormStatus()`사용 가능.
- `const { pending } = useFormStatus()`를 통해 로딩 처리 가능.

---

### `useActionState()`

- [React-useActionState](<https://react.dev/reference/react/useActionState#noun-labs-1201738-(2)>)
- `const [state, formAction] = useFormState(action, {initialData: initialData});`
- form의 action attr에는 formAction을 할당..
- action 함수는 2개의 파라미터를 받는다.
  - 초기값,
  - formData
  - `action(initialVal, formData)`
  - 에러 발생 시 return 값에 특정 프로퍼티를 넘기면, 그 프로퍼티 객체가 state에 저장된다.
  - 이를 이용해 에러 핸들링이 가능하다.

---

### Next.js Cache

- Next.js는 굉장히 공격적으로 캐싱한다.
- Next.js는 build 단계에서 가능한 한 많은 페이지를 정적 페이지로 생성한다.

  - 굉장히 빠른 로딩 속도를 볼 수 있다.
  - 그러나 이 페이지들은 데이터 패칭을 다시 실행하지 않는다.

    <br />

- `revalidatePath('path'[, 'file'])`
  - 캐시 유효성 재확인 트리거
  - server action 함수내에서 실행.(redirect 직전)
  - 중첩 된 것은 확인하지 못 하므로, 각각의 경로마다 추가해줘야 함.
  - 그러나 파일 경로에 layout을 추가하면 모든 중첩된 페이지를 검사하게 됨.

---

### Metadata

- Next.js는 모든 page 혹은 layout에 Metadata field를 찾는다.
- 검색 엔진 크롤러에 노출될 수 있는 내용들을 저장한다.
- `metadata` 변수 사용

```jsx
export const metadata = {
  title: "page-title",
  description:
    "the description about this page. you can write whatever you want",
};
```

- 동적 페이지에 추가하기
- `generateMetadata()`사용
- 인수로 전달되는 객체의 params는 동적 페이지의 params 객체와 동일한 값을 전달 받는다.

```jsx
export default function generateMetadata({ params }) {
  const id = params.id;
  // 유효하지 않은 페이지 접근 시, params 객체를 사용하며 error가 발생할 수 있으므로 early return으로 미리 처리해준다.
  if(!id){
    notFount();
  }

  return {
    title: `detailPage${id}`
    description: `A description about item${id}`
  }
}
```

---
