## Page-router

- page 폴더에서 시작.
- `index.js`는 해당 경로의 기본 페이지.
- 파일이 하나의 페이지가 됨. 파일 이름이 경로

---

### 중첩 경로 & 라우트

- `폴더 이름` -> `index.js`는 경로가 됨.(`'baseUrl/폴더이름'`)
- `폴더 이름` -> `list.js`는 경로가 됨.(`'baseUrl/폴더이름/list'`)

---

### Dynamic Routing

- `[id].tsx`로 경로 생성
- `import { useRouter } from "next/router"`
- `router.pathname` 현재 경로 확인 가능.
- `router.query` dynamic route path 확인 가능. `{id: "something"}`

### Catch-All 라우트

- `[...slug].js `로 파일 이름 설정
- `baseUrl/id/2/guest` -> {slug: ["id", "2", "guest"]}

### Link

- `import Link from "next/link"`
- `<a>`와 같은 기능을 하나 페이지 새로고침 미발생
- `href` 객체로 설정가능

```jsx
<Link
  href={{
    pathName: "clients/[id]",
    query: { id: something },
  }}
></Link>
```
