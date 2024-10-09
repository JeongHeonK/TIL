## VDOM

프로그래밍 컨셉

- 메모리 상에 UI 관련된 정보를 띄운다.
- react-dom과 같은 라이브러이에 의해서 실제 DOM과 sync를 맞춘다. -> reconciliation

### 왜 가상돔인가?

-> 실제 DOM에 적용하는 것이 비용이 더 큼 (mount -> paint)

```jsx
const root = ReactDom.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.strictMode>
    <App />
  </React.strictMode>
)
```

### 컴포넌트 리렌더링

컴포넌트 호출 후 그 결과가 VDOM에 반영되는 것. 실제 DOM에 mount되어 paint되는 것이 아님.

### React lifecycle

- Render phase
  - VDOM 재조정(reconciliation)하는 단계
  - element 추가, 수정, 삭제 -> WORK를 scheduler에 등록
  - WORK? reconciler가 컴포넌트의 변경을 DOM에 적용하기 위해 수행하는 일
  - reconciler가 담당
    - **중요** stack에서 fiber로 바뀌면서 렌더링 우선순위 변경가능
- commit phase
  - 재조정한 VDOM을 DOM에 적용 & 라이프사이클을 실행하는 단계
    - 일관성을 위해 sync 실행.
      - React가 DOM 조작 일괄처리 -> 콜스텍 비우기 -> 브라우저 paint 실행
