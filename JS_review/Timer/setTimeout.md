### setTimeout

```js
function movePage(location: string, delaySec: number) {
  setTimeout(() => {
    window.location.href = location;
  }, delaySec * 1000);
}

login(userInput);
movePage("/", 5);
```

- 페이지 몇초 뒤 이동 혹은 팝업 몇초 후 사라질 때 사용

```js
// toast 만들기
function showNotification(message, duration) {
  const notification = document.createElement("div");
  notification.innerText = message;
  notification.setAttribute("class", "notification");
  document.body.append(notification);
  setTimeout(() => {
    notification.remove();
  }, duration);
}
```
