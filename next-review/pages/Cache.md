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
