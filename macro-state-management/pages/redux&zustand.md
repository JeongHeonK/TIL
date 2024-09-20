## Zustand와 Redux의 차이점

- 둘 다 단방향 데이터 흐름을 기반.
- 상태 갱신 방법에 차이 존재

  - Redux의 경우 리듀서에 기반
  - 이전 상태와 action 객체를 받아 새로운 상태를 반환하는 순수함수
  - 생성된 store 간접 사용(useSelector, useDispatch)

- 주요 차이
  - 디렉터리 구조
    - Redux는 features 디렉터리 구조 제안, createSlice함수는 기능 디렉터리 패턴
    - Zustand는 따로 추천 ㄹ구조 없음.
  - Immer
    - Redux는 Immer 기본적으로 사용
    - Zustand는 개발자 선택
  - 단방향 흐름 기반
    - Redux는 단방향 데이터 흐름을 기반으로 함.
    - Zustand는 개발자 선택
