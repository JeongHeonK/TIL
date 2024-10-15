## useState

### hook 객체

- `mountWorkInProgressHook()` 실행시 hook내부에서 값 할당

```ts
function mountWorkInProgressHook(): Hook {
  const hook: Hook = {
    memoizedState: null, // 마지막에 얻은 state 값

    baseState: null,
    queue: null, // update 객체를 linked list로 구현한 queue에 저장
    baseUpdate: null,

    next: null, // linked list
  };

  // ...생략
}
```

- hook.memoizedState 마지막에 얻은 state 값
- hook.next 다음 hook을 가리키는 pointer(linked list)
- hook.queue hook을 호출할 때마다 update 객체를 linked list로 구현한 queue에 저장

### workInProgressHook

- workInProgressHook === null ? 첫번째 hook 아니면 다음 hook 추가
- fiber.memoizedState에 firstWorkInProgressHook 할당

### mountState

- initialState가 함수면 초기값 할당
- hook.memoizedState에 initialState할당

### queue

- queue.last에서 가장 마지막 update값을 가리킴

## setState의 state 업데이트 방벙

### dispatchAction 함수

- update 객체 생성
  - expirationTime
  - action
  - next: null
  - eagerReducer, eagerState : 렌더링 최적화
- 생성된 update 객체를 queue에 저장
- 불필요한 렌더링이 발생하지 않도록 최적화
- update를 적용하기 위해 Work를 scheduler에 예약

## idle phase와 render phase 구별

```ts
let currentlyRenderingFiber: Fiber | null = null;
// work in progress 였으나 구분하기 위해 이름 다르게 지음.

if (
  fiber === currentlyRenderingFiber ||
  (alternate !== null && alternate === currentlyRenderingFiber)
) {
}
```

### didScheduleRenderPhase

렌더 페이즈가 시작됨.

- `renderOfReRenders`를 사용해서 렌저링 제한
- `const RE_RENDER_LIMIT = 25`
