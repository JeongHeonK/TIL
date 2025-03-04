### Session Storage

- local storage와 거의 비슷
- 새창 혹은 새탭을 열 경우 공유되지 않음
- 즉 닫으면, 초기화 됨
- 검색 내역, 광고 모달창 오픈 여부 같은 것 저장함

```js
const openAdModal = () => {
  if (Boolean(sessionStorage.getItem("shownWarning"))) return;

  Modal.open();
  sessionStorage.setItem("shownWarning", true);
};

openAdModal();
```

- 근데 제어컴포넌트로 관리하면 그닥 쓸가 싶음.
- 새로고침 여부에 따라서도 데이터가 유지된다면 사용하나, 요구 조건이 명확해야 할 것으로 보임
