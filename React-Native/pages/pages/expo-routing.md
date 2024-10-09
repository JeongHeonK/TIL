## expo-routing

- 폴더기반 라우팅 app의 index가 시작
- 폴더를 만드는 순간 그곳이 주소가 됨. app -> user 의 경우 `/user`로 이동 가능
- `/user`로 이동 시, index.js가 있으면 페이지 보여줌. `/user/[id]`일 경우 dynamic route 생성됨.
- dynamic route의 param은 `useLocalSearchParams()`로 조회 가능
- 타입은 `useLocalSearchParams<{id: string}>();`으로 지정 가능
