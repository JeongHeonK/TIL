## Cache

| 종류 |          Request Memoization           |                  Data Cache                   |    Full Route <br/> Cache    |           Router Cache           |
| :--: | :------------------------------------: | :-------------------------------------------: | :--------------------------: | :------------------------------: |
| 대상 |         fetch 함수의 return 값         |                     Data                      |      HTML, RSC Payload       |           RSC Payload            |
| 장소 |                  서버                  |                     서버                      |             서버             |            클라이언트            |
| 목적 | React Component tree에서 data의 재사용 | 유저 요청이나 deployment에 의해 저장된 데이터 | 렌더링 cost 감소 및 성능향상 | 네비게이션에 의한 서버 요청 감소 |
| 기간 |            request 생명주기            |                    영구적                     |            영구적            |    세션 또는 정해진 시간 동안    |

---

### Request Memoization

- 정확히 동일한 요청일 때, caching된다.(headers 구성이 다르면, caching 미발생)
- `revalidatePath()`를 사용할 수 있으나 fetch에서도 설정할 수 있음.
- `fetch()` config의 cache 프로퍼티 사용.

```jsx
fetch('url', {
  cache: 'force-cache' // 가능한 한 caching 해라.
  cache: 'no-store' // 이 요청은 caching되지 않는다. -> 항상 새로운 데이터 반영.
})
```

- `fetch()` config의 next 프로퍼티 사용.

```jsx
fetch("url", {
  next: {
    revalidate: 60, // s 단위 5 -> 5s
  },
});
```

- 페이지 전체에 대한 revalidate time 설정할 때.

  - 페이지 상단에 revalidate 변수 선언 및 숫자 할당

  ```jsx
  export const revalidate = 5; // 초 단위(5s)

  export default function someComponent() {
    return();
  }
  ```

- 페이지 상단에 dynamic 변수 선언

  - `"force-dynamic"`으로 설정한 경우, 항상 재요청(caching되지 않음)

  ```jsx
  export const dynamic = "force-dynamic";

  export default function someComponent() {
    return();
  }
  ```

- `import { unstable_noStore as noStore } from "next/cache";`

  - 컴포넌트 내에서 `"noStore()"`실행 시, 캐시되지 않음.
  - 페이지 내의 일부 컴포넌트만 캐싱을 비활성화할 때 사용.

  ```jsx
  import { unstable_noStore as noStore } from "next/cache";

  export default async function Component() {
  noStore();
  const result = await db.query(...);
  ...
  }

  ```

  > **참고**: Next.js 15에서 `unstable_noStore`는 deprecated되었다. 대신 `import { connection } from "next/server"`를 사용하고, 컴포넌트 내에서 `await connection()`을 호출한다.

---

### Full Route Cache

- `npm run build`시 사용됨.
- dynamic routing을 사용한 경우, 동적 페이지로 빌드되나, 나머지는 가능한 한 정적 페이지로 빌드된다.
- `revalidatePath()` 사용이 권장됨.

  - 가능한한 많은 부분을 caching하면서 필요할 때만 update된 데이터를 얻을 수 있기 때문.

- `revalidateTag()`
- fetch()함수 사용시, 특정 태그 추가 가능.

```jsx
fetch("url", {
  next: {
    tags: ["msg"],
  },
});

// otherPage.js
async function someHandler() {
  //...생략
  revalidateTag("msg");
  redirect("/");
}
```

---

### Custom Fetch

- 직접 데이터 베이스에 접근할 경우 fetch 데이터를 사용하지 않을 수 있다.
- 이 경우 Next.js는 caching을 실행하지 않는다.
- react의 cache함수를 이용한다.

  ```jsx
  import { cache } from "react";

  export const getMsg = cache(function getMsg() {
    return db.collection.find("doc");
  });
  ```

- `unstable_cache`

```jsx
import { unstable_cache as nextCache } from "next/cache";

export const getMsg = nextCache(
  // return 결과를 cache
  cache(function getMsg() {
    // 요청을 cache
    return db.collection.find("doc");
  }),
  ["message"],
  {
    // cache를 구분하기 위한 키
    tags: ["msg"],
    // 이 태그를 통해 cache를 초기화할 수 있음.
  }
);

// update함수내에서
function someUpdateFunc() {
  //...생략
  revalidateTag("msg");
  // 위 함수 사용시 tags에 msg지정한 함수 cache 초기화 됨.
}
```

> **참고**: `unstable_cache`는 Next.js 15에서 `use cache` 지시문으로 대체되었다. 새 프로젝트에서는 `use cache`를 사용하는 것이 권장된다.

---

### React.cache() 사용 시 주의사항

- `React.cache()`는 `Object.is`로 얕은 비교를 하므로, 인라인 객체를 인자로 전달하면 항상 cache miss가 발생한다.

```jsx
const getUser = cache(async (params) => {
  return await db.user.findUnique({ where: { id: params.uid } });
});

// Anti-pattern: 매번 새 객체 → cache miss
getUser({ uid: 1 });
getUser({ uid: 1 }); // 다시 쿼리 실행

// 올바른 패턴: 원시값을 인자로 사용
const getUser = cache(async (uid) => {
  return await db.user.findUnique({ where: { id: uid } });
});

getUser(1);
getUser(1); // cache hit
```

- Next.js의 `fetch`는 자동으로 요청 중복 제거가 적용되므로 `React.cache()` 래핑이 불필요하다.
- 그러나 DB 쿼리, 인증 확인, 파일시스템 작업 등 fetch가 아닌 비동기 작업에는 `React.cache()`가 필수적이다.

---

### Cross-Request LRU 캐싱

- `React.cache()`는 단일 요청 내에서만 작동한다. 여러 요청에 걸쳐 데이터를 공유하려면 LRU 캐시를 사용한다.

```jsx
import { LRUCache } from "lru-cache";

const cache = new LRUCache({
  max: 1000,
  ttl: 5 * 60 * 1000, // 5분
});

export async function getUser(id) {
  const cached = cache.get(id);
  if (cached) return cached;

  const user = await db.user.findUnique({ where: { id } });
  cache.set(id, user);
  return user;
}
```

- Vercel Fluid Compute 환경에서는 동일 인스턴스를 여러 요청이 공유하므로 LRU 캐시가 특히 효과적이다.
- 전통적인 serverless 환경에서는 Redis 같은 외부 캐시를 고려해야 한다.
