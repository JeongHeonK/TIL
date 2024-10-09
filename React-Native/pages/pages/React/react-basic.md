## 리액트의 구성 요소들

### 구성 요소

- react 코어
  - component정의
  - 다른 패키지에 의존성이 없음. -> 다양한 플랫폼에서 사용 가능
- renderer
  - react-dom, react-native-renderer 등 호스트 렌더링 환경에 의존
  - reconciler와 legacy-events 피키지 의존성
- event(legacy-events)
  - SyntheticEvent 라는 이름의 내부적으로 개발된 이벤트 시스템
  - 기존 웹에서 event를 wrapping, 추가적인 기능 수행
- scheduler
  - react는 task를 비동기고 실행
  - 이 실행 타이밍을 알고 있는 패키지
- reconciler
  - Fiber architecture 에서 VDOM 재조정 담당
  - 컴포넌트 호출

### 용어

- 렌더링
  - 컴포넌트를 호출하여 react element를 반환 -> VDOM에 적용(재조정)하는 과정
  - 전체 과정
    - 컴포넌트 호출 return react element
    - VDOM 재조정 작업(여기까지 렌더링)
    - renderer가 컴포넌트 정보를 DOM에 삽입(mount)
    - 브라우저가 DOM을 paint
- react element
  - 컴포넌트 호출시 return 하는 것(JSX -> babel을 통해 react.createElement() 호출)
  - 컴포넌트의 정보를 담은 객체
    - type, key, props, ref등
- fiber
  - VDOM의 노드 객체
  - react element의 내용이 DOM에 반영되기 위해, 먼저 VDOM에 추가되어야 하는데, 이를 위해 확장한 객체
    - 컴포넌트의 상태, life cycle, hook이 관리됨.
