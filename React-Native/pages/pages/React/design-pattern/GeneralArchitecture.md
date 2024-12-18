### General Architecture

```
src
 ├── api : api request or communicating with server
 ├── assets : assets
 ├── components : components (common, 특정 디렉토리에서 쓰이는 컴포넌트)
 ├── config : 설정 파일들. firebase, tsconfig 등
 ├── constants : 상수들
 ├── context : context api 관련, 렌더링 최적화를 위해 context분리 해줘야 함.
 ├── helpers : 작은 크기의 함수들 혹은 시간, 날짜 등을 위한 method들
 ├── hooks : custom hook들 특히 재사용 가능한걸로, 특정 컴포넌트에 의존성이 높다면 여기에 분리할 필요 없음. 같은 위치에 두는게 나음.
 ├── intl : 다국어 지원시 사용 옵셔널.
 ├── layout : 서로 다른 레이아웃을 보여줘야 할때(로그아웃에 따라)
 ├── services : 비즈니스 로직
 ├── store : 전역 상태 라이브러리 관련
 ├── styles : global styles
 ├── types : 타입들
 └── views :페이지의 루트(app.jsx 등)
```
