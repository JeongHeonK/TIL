### local storage

- 보통 브라우저별로 5Mb
- `localStorage.getItem(key)`
- `localStorage.setItem(key, value)`
- `localStorage.removeItem(key)`
- local storage는 json을 사용해서 저장해야함.
- 안그럼 string으로 변환되어 저장됨.(레퍼런스 값들)
- 민감한 정보는 저장 불가(누구나 접근 가능)
- dark mode 저장 시 사용 (react에서는 context api와 연동)

#### Sync local storage

```js
function applySavedTheme() {
  const savedTheme = localStorages.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    toggleButtons.textContent = "Light Mode";
    return;
  }

  document.body.classList.remove("dark-mode");
  toggleButtons.textContent = "Dark Mode";
}

window.addEventListener("storage", (e) => {
  if (e.key === "theme") {
    applySavedTheme();
  }
});
```

- 같은 페이지를 여러 탭으로 열었을 경우, 각각의 탭에서 storage가 다르게 적용됨.
- 이 경우 window에 이벤트 리스너를 붙여서 store 전환 효과가 발생한다면, Event를 발생시키도록 해야함.
