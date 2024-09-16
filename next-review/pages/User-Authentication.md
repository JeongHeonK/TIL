## User Authentication

### 사용자 인증 라이브러리

1. lucia

2. Next-Auth

---

### `cookies()`

- 어떤 라이브러리를 사용하던 쿠키에 sessionId 저장 가능.
- 요청을 보낼 때 자동으로 쿠키 정보도 같이 전송한다는 점을 이용.
- [Next.js에서 사용할 수 있는 함수]("https://nextjs.org/docs/app/api-reference/functions/cookies")
- `import { cookies } from "next/headers"`
- cookies.has(name)는 true, false를 return한다.
- cookies.set(name, value, options)를 통해 쿠키 설정 가능

---

### [searchParams]("https://nextjs.org/docs/app/api-reference/file-conventions/page#searchparams-optional")

- `/shop?a=1&b=2` -> `{ a: '1', b: '2' }`
- searchParams를 통해 link buttons 클릭시 로그인/가입 전환 가능
