## reconciler의 renderWithHooks()

### ReactCurrentDispatcher.current에 할당하는가?

- `nextCurrentHook === null -> mount(HooksDispatcherOnMount)`
- `nextCurrentHook !== null -> update(HooksDispatcherOnUpdate)`

```js
// 코드
ReactCurrentDispatcher.current =
  nextCurrentHook === null ? HooksDispatcherOnMount : HooksDispatcherOnUpdate;
```

---

### renderWithHooks()란?

hook과 함께 render 즉, hook을 주입하는 역할
(렌더링: 컴포넌트 호출 후 그 결과가 VDOM에 반영되는 과정)

- 컴포넌트 호출도 진행
- 이때 `ReactCurrentDispatcher.current`에 할당된 값들이 모두 실행됨.
