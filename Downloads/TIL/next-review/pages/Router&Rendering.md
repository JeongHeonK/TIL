## Routeing & Rendering

### 병렬 라우트 설정 및 사용

- 별도의 경로를 가지는 2개의 페이지를 한 페이지에서 동시에 랜더링 하는 것.
- 폴더 경로는 `@` 로 시작 한다.
- 한 페이지 내에서 각각의 페이지가 다른 기능을 할 때 사용한다. (아니라면, 그냥 컴포넌트를 import해서 불러오는 것과 차이가 없다.)

```
- archive - layout.js
 ⎣@archive - page.js
 ⎣@latest - page.js
```

- 이렇게 작성할 경우 layout.js의 props에서 `@` 뒤에 적힌 경로를 키로 가진 프로퍼티를 사용할 수 있다.

- 병렬 라우터는 폴더를 무시한다. <br/>
  (@modal -> (.)image) => O <br/>
  (@modal -> (..)image) => X

```jsx
// layout.js
export default function archiveLayout({ archive, latest }) {
  // ... 생략
  return (
    <div>
      <section>{archive}</section>
      <section>{latest}</section>
    </div>
  );
}
```

---

### 병렬 라우트에서의 중첩 라우트

- default.js를 사용해야 한다.
- 만약 archive페이지에서 자신의 중첩 라우트인 `/archive/someUrl`로 이동한다면, latest에서 보여줄게 없어진다.
- 이때 `default.js`를 통해 병렬 처리된 라우트가 이동할 때 보여줄 기본값을 설정한다. 병렬 라우팅 폴더 안에 만들어야 함 -> `@latest - default.js`

---

### Catch-All Route

- dynamic route 문제점.
  <br/>
  ex) post/[id] -> post/1, post/2 가능, post/1/123 불가능

- 중첩된 모든 요소의 route를 잡을 수 있다.`[id]` -> `[[...id]]`
  <br/>
  ex) post/[[...id]] -> post/1/123, post/2/22/44 가능

---

### Intercepting

- `(.)intercept할 URL` : 같은 디랙토리
- `(..)intercept할 URL` : 상위 디랙토리
- 새로고침이나 경로 직접 입력시 해당 URL로 이동
- Link 태그등을 이요해서 접속시 intercepting page 실행

---

### Intercept Routing과 병렬 라우팅 결합

- 모달창 구현시 사용
- server component에서 구현 가능.
- modal로 변경할 path를 병렬 라우팅 내에서 intercept 한다.
- 병렬 라우터는 폴더를 무시하기에 경로는 `(.)`로 설정한다. <br/>
  (@modal -> (.)image) => O <br/>
  (@modal -> (..)image) => X
- 병렬 라우터 내부이면서, intercepting하는 경로 상위에 `default.js`를 추가한다.
- 'default.js`는 null을 return 한다.

```jsx
export default parallelPageDefault() {
  return null;
}
```

---

### useRoute

- `"use client"`에서 사용 가능
- `const router = useRouter();`
- `router.back()`을 실행하면 뒤로가기.

---

### Route group

- `(폴더명)` 작성
- path에 안 뜸.
- 이를 통해 각각의 `layout.ts`페이지 생성가능
- 외에도 목적에 따라 파일들 분류 가능

---

### Route handler

- next.13 버전 이후 생성된 기능
- 기존의 api 처리 시, `pages/api`에서 `handler`함수가 모든 요청을 처리하였으나, 이제는 함수 이름을 http method로 설정하여 각 요청 방법에 대해서 각각의 함수로 처리할 수 있다.
- `api`폴더 내에 `route.ts`생성. 같은 경로에 page.tsx가 있을 수 없다. [Next.js Doc참조]("https://nextjs.org/docs/app/building-your-application/routing/route-handlers")
- 함수 이름은 `HTTP METHOD`(`GET`, `POST`, `PATCH`, `DELETE`)로 만듬.
- 기본 구조

```jsx
export function GET(request) {
  console.log(request);

  return new Response("Hello!");
}
```

- Next.js로 만든 애플리케이션을 요청을 보내는 모바일 앱으로 만들 때 사용.

---

### middleware

- 루트 경로에 `middleware.ts` 생성
- NextResponse return
- 모든 요청을 검토해서 요청 정보에 따라 다른 응답을 하기 위해 사용.
- 인증 구현시 사용.(로그인 정보 없을 시, 경로 전환 `NextResponse.redirect()`)

```jsx
import { NextResponse } from "next/server";

export function middleware(request) {
  console.log(request);
  return NextResponse.next();
}
```

- 모든 요청에 대한 경과를 처리함.

```jsx
import { NextResponse } from "next/server";

export function middleware(request) {
  console.log(request);
  return NextResponse.next();
}

// 경로 필터링 가능
export const config = {
  matcher: "/news",
};
```

- `config`: 미들웨어 설정 가능.

---
